import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { Mic, MicOff, Phone, PhoneOff, Radio, Volume2, VolumeX, Globe, Heart } from 'lucide-react';
import Visualizer from './components/Visualizer';
import { SYSTEM_INSTRUCTION, DEFAULT_GREETING } from './constants';
import { base64ToUint8Array, float32ToInt16PCM, arrayBufferToBase64, INPUT_SAMPLE_RATE } from './utils/audio-utils';
import { TranscriptionItem, VoiceName } from './types';

const App: React.FC = () => {
  // API Key check
  const apiKey = process.env.API_KEY;
  const [hasKey, setHasKey] = useState(false);

  // Session State
  const [connected, setConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [voice, setVoice] = useState<VoiceName>(VoiceName.Kore);
  const [transcripts, setTranscripts] = useState<TranscriptionItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Audio Refs - Separate contexts for Input (16k) and Output (24k)
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  // Output Audio Refs
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const currentSessionRef = useRef<any>(null); // Using any for the specialized Session type

  // Scroll Ref
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (apiKey) setHasKey(true);
  }, [apiKey]);

  // Auto-scroll transcripts
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  const initializeOutputAudioContext = () => {
    if (!outputAudioContextRef.current) {
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000 // Output rate
      });
      
      // Create Analyser
      const analyser = outputAudioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
    }
    return outputAudioContextRef.current;
  };

  const playAudioChunk = async (base64Audio: string) => {
    const ctx = outputAudioContextRef.current;
    if (!ctx) return;

    try {
      const arrayBuffer = base64ToUint8Array(base64Audio).buffer;
      
      // Decode manually since it's raw PCM from Live API usually
      // Live API sends PCM 24kHz mono
      const pcmData = new Int16Array(arrayBuffer);
      const audioBuffer = ctx.createBuffer(1, pcmData.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      
      // Convert Int16 to Float32
      for (let i = 0; i < pcmData.length; i++) {
        channelData[i] = pcmData[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      // Connect to analyser for visualization
      if (analyserRef.current) {
        source.connect(analyserRef.current);
      }

      // Schedule playback
      // Ensure we don't play in the past
      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }
      
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
      
      audioQueueRef.current.push(source);
      
      source.onended = () => {
        audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
      };

    } catch (e) {
      console.error("Error playing audio chunk", e);
    }
  };

  const startSession = async () => {
    if (!apiKey) return;
    setError(null);

    try {
      const ctx = initializeOutputAudioContext();
      await ctx.resume();

      const ai = new GoogleGenAI({ apiKey });
      
      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } }
          },
          inputAudioTranscription: {}, // Fixed: Removed invalid model property
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            console.log("Live API Connected");
            setConnected(true);
          },
          onmessage: (message: LiveServerMessage) => {
            // Handle Audio
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
              playAudioChunk(audioData);
            }

            // Handle Transcripts
            if (message.serverContent?.outputTranscription?.text) {
               setTranscripts(prev => [...prev, {
                 id: Date.now().toString(),
                 text: message.serverContent?.outputTranscription?.text || "",
                 sender: 'model',
                 timestamp: new Date(),
                 isFinal: false
               }]);
            }
            
            // Handle User Transcripts (Input)
            if (message.serverContent?.inputTranscription?.text) {
              // Optimization: Update last user message if it wasn't final, or add new
              setTranscripts(prev => {
                 const last = prev[prev.length - 1];
                 if (last && last.sender === 'user' && !last.isFinal) {
                   const newArr = [...prev];
                   newArr[prev.length - 1] = { ...last, text: last.text + message.serverContent?.inputTranscription?.text };
                   return newArr;
                 }
                 return [...prev, {
                   id: "user-"+Date.now(),
                   text: message.serverContent?.inputTranscription?.text || "",
                   sender: 'user',
                   timestamp: new Date(),
                   isFinal: false // Live API stream updates are tricky, treating as stream
                 }];
              });
            }

            if (message.serverContent?.turnComplete) {
               // Mark transcripts as complete if needed
            }
          },
          onclose: () => {
            setConnected(false);
            console.log("Live API Closed");
          },
          onerror: (err) => {
            console.error("Live API Error", err);
            setError("Connection disrupted.");
            setConnected(false);
          }
        }
      });

      currentSessionRef.current = sessionPromise;
      
      // Start Microphone immediately
      await startMicrophone(sessionPromise);

    } catch (err: any) {
      setError(err.message || "Failed to connect");
      setConnected(false);
    }
  };

  const startMicrophone = async (sessionPromise: Promise<any>) => {
    try {
      // Initialize Input Context (16kHz)
      if (!inputAudioContextRef.current) {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: INPUT_SAMPLE_RATE
        });
      }
      const ctx = inputAudioContextRef.current;
      await ctx.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        sampleRate: INPUT_SAMPLE_RATE,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true
      } });
      
      mediaStreamRef.current = stream;
      const source = ctx.createMediaStreamSource(stream);
      sourceRef.current = source;

      // Use ScriptProcessor for simple raw PCM access (preferred for Live API demo simplicity)
      const processor = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        
        // Convert Float32 to Int16
        const pcm16 = float32ToInt16PCM(inputData);
        
        // Encode to base64
        const base64Data = arrayBufferToBase64(pcm16.buffer);
        
        // CRITICAL: Solely rely on sessionPromise resolves and then call `session.sendRealtimeInput`
        sessionPromise.then(session => {
            session.sendRealtimeInput({
                media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                }
            });
        });
      };

      source.connect(processor);
      processor.connect(ctx.destination); // Needed to keep processor alive
      
      setMicOn(true);
    } catch (e) {
      console.error("Mic error", e);
      setError("Microphone access denied.");
    }
  };

  const stopSession = () => {
    // Stop Audio Context stuff
    mediaStreamRef.current?.getTracks().forEach(t => t.stop());
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    
    // Close Session
    if (currentSessionRef.current) {
      currentSessionRef.current.then((session: any) => session.close());
      currentSessionRef.current = null;
    }
    
    setConnected(false);
    setMicOn(false);
    setTranscripts([]);
    
    // Clear Audio Queue
    audioQueueRef.current.forEach(s => s.stop());
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
  };

  const toggleMic = () => {
    if (!mediaStreamRef.current) return;
    const enabled = !mediaStreamRef.current.getAudioTracks()[0].enabled;
    mediaStreamRef.current.getAudioTracks()[0].enabled = enabled;
    setMicOn(enabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-900 via-slate-900 to-nordic-800 text-white font-sans relative overflow-hidden">
        {/* Aurora Background Effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=2070')] bg-cover animate-pulse" />
        
        <div className="container mx-auto max-w-2xl p-6 relative z-10 flex flex-col h-screen">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold tracking-wide text-nordic-accent drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                        Midnight Suomi
                    </h1>
                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        LIVE • The Master Guide to Falling in Love... with Finnish
                    </p>
                </div>
                <div className="bg-white/5 p-2 rounded-full">
                   <Globe className="w-6 h-6 text-nordic-aurora" />
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Visualizer / Status Area */}
            <div className="flex-1 flex flex-col justify-center items-center relative mb-8 bg-slate-900/50 rounded-3xl border border-slate-700/50 shadow-2xl backdrop-blur-sm">
                <div className="absolute top-4 right-4 flex gap-2">
                     <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${connected ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                        {connected ? 'On Air' : 'Offline'}
                     </span>
                </div>

                {/* Character Avatars (Static representation) */}
                <div className="flex gap-8 mb-8 opacity-80">
                    <div className={`text-center transition-all duration-500 ${connected ? 'scale-110 text-nordic-accent' : 'scale-100 grayscale'}`}>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200" className="rounded-full w-full h-full object-cover border-4 border-nordic-900" alt="Sarah" />
                        </div>
                        <p className="mt-2 font-serif">Sarah</p>
                    </div>
                    <div className={`text-center transition-all duration-500 ${connected ? 'scale-110 text-nordic-aurora' : 'scale-100 grayscale'}`}>
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1">
                             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200" className="rounded-full w-full h-full object-cover border-4 border-nordic-900" alt="Aino" />
                        </div>
                        <p className="mt-2 font-serif">Aino</p>
                    </div>
                </div>

                {/* Audio Visualizer */}
                <div className="w-full px-8">
                    <Visualizer analyser={analyserRef.current} isActive={connected} />
                </div>
            </div>

            {/* Transcripts (Chat Bubbles) */}
            <div className="h-48 overflow-y-auto mb-6 space-y-3 scrollbar-hide bg-black/20 p-4 rounded-xl border border-white/5">
                {transcripts.length === 0 && (
                    <p className="text-center text-slate-500 text-sm italic mt-10">
                        Tap "Join Broadcast" to start the conversation...
                    </p>
                )}
                {transcripts.map((t, i) => (
                    <div key={t.id + i} className={`flex ${t.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                             t.sender === 'user' 
                                ? 'bg-nordic-accent text-nordic-900 rounded-br-none' 
                                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                         }`}>
                            {t.sender === 'model' && <span className="text-xs text-nordic-aurora font-bold block mb-1">Midnight Suomi</span>}
                            {t.text}
                         </div>
                    </div>
                ))}
                <div ref={transcriptEndRef} />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-4 items-center">
                {/* Mute Toggle */}
                <button 
                    onClick={toggleMic}
                    disabled={!connected}
                    className={`p-4 rounded-full flex justify-center items-center transition-all ${
                        micOn 
                            ? 'bg-slate-800 text-white hover:bg-slate-700' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed mx-auto w-16 h-16`}
                >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>

                {/* Main Call Button */}
                <button 
                    onClick={connected ? stopSession : startSession}
                    disabled={!hasKey}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-nordic-accent/20 transition-all transform hover:scale-105 active:scale-95 ${
                        connected 
                            ? 'bg-red-500 hover:bg-red-600 animate-none' 
                            : 'bg-nordic-accent hover:bg-sky-400 animate-pulse'
                    }`}
                >
                    {connected ? <PhoneOff size={32} className="text-white" /> : <Phone size={32} className="text-nordic-900" />}
                </button>

                 {/* Voice Selector (Disabled while connected for simplicity of Live API) */}
                 <div className="flex flex-col items-center justify-center mx-auto">
                    <select 
                        disabled={connected}
                        value={voice}
                        onChange={(e) => setVoice(e.target.value as VoiceName)}
                        className="bg-slate-800 text-xs text-slate-300 py-2 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-nordic-accent disabled:opacity-50"
                    >
                        {Object.values(VoiceName).map(v => (
                            <option key={v} value={v}>{v} Voice</option>
                        ))}
                    </select>
                 </div>
            </div>

            {/* Disclaimer / API Key Warning */}
            {!hasKey && (
                <div className="absolute bottom-20 left-0 w-full px-6">
                     <div className="bg-yellow-500/90 text-yellow-900 p-3 rounded-lg text-sm font-semibold text-center shadow-lg">
                        API Key missing in environment variables.
                     </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default App;