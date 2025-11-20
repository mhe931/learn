export interface AudioState {
  isPlaying: boolean;
  isRecording: boolean;
  volume: number;
}

export interface TranscriptionItem {
  id: string;
  text: string;
  sender: 'user' | 'model';
  timestamp: Date;
  isFinal: boolean;
}

export enum VoiceName {
  Puck = 'Puck',
  Charon = 'Charon',
  Kore = 'Kore',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr',
}

export interface LiveConfig {
  voiceName: VoiceName;
}