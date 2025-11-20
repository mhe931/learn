export const PCM_SAMPLE_RATE = 24000;
export const INPUT_SAMPLE_RATE = 16000;

/**
 * Decodes a base64 string into a Uint8Array.
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Encodes a Uint8Array/Float32Array to a base64 string.
 */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts AudioContext Float32 data to Int16 PCM for Gemini.
 */
export function float32ToInt16PCM(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16Array;
}

/**
 * Decodes raw PCM data from Gemini into an AudioBuffer.
 */
export function pcmToAudioBuffer(
  pcmData: Int16Array,
  audioContext: AudioContext
): AudioBuffer {
  const buffer = audioContext.createBuffer(
    1, // mono
    pcmData.length,
    PCM_SAMPLE_RATE
  );
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < pcmData.length; i++) {
    channelData[i] = pcmData[i] / 32768.0;
  }
  return buffer;
}

/**
 * Helper to re-sample audio if necessary (simple decimation/interpolation).
 * NOTE: For best quality, use a proper resampler library, but this works for simple voice.
 */
export function downsampleBuffer(
  buffer: AudioBuffer,
  targetRate: number
): Float32Array {
  if (targetRate === buffer.sampleRate) {
    return buffer.getChannelData(0);
  }
  const ratio = buffer.sampleRate / targetRate;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);
  const source = buffer.getChannelData(0);
  
  for (let i = 0; i < newLength; i++) {
    result[i] = source[Math.round(i * ratio)] || 0;
  }
  return result;
}