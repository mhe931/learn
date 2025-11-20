export enum SlideType {
  TITLE = 'TITLE',
  TABLE_OF_CONTENTS = 'TABLE_OF_CONTENTS',
  TEXT = 'TEXT',
  VOCABULARY_TABLE = 'VOCABULARY_TABLE',
  GRAMMAR_CARD = 'GRAMMAR_CARD',
  IMAGE_TEXT = 'IMAGE_TEXT'
}

export interface VocabularyItem {
  fi: string;
  en: string;
  note?: string;
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string; // Markdown-like text
  vocabulary?: VocabularyItem[];
  grammarPoints?: { rule: string; example: string; translation: string }[];
  image?: string;
  funFact?: string; // New field for interesting tidbits
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}