import { makeAutoObservable } from 'mobx';
import { Transcription } from '@/types/transcription';

export class TranscriptionStore {
  transcriptions: Transcription[] = [];
  currentTranscription: Transcription | null = null;
  isProcessing = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentTranscription = (transcription: Transcription | null) => {
    this.currentTranscription = transcription;
  };

  addTranscription = (transcription: Transcription) => {
    this.transcriptions.push(transcription);
  };

  setProcessing = (processing: boolean) => {
    this.isProcessing = processing;
  };
}

export const transcriptionStore = new TranscriptionStore();