import { makeAutoObservable } from 'mobx';

export class AccessibilityStore {
  fontSize: number = 16;
  highContrast: boolean = false;
  autoScroll: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.loadSettings();
  }

  private loadSettings() {
    const savedSettings = localStorage.getItem('accessibility');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.fontSize = settings.fontSize;
      this.highContrast = settings.highContrast;
      this.autoScroll = settings.autoScroll;
    }
  }

  private saveSettings() {
    localStorage.setItem('accessibility', JSON.stringify({
      fontSize: this.fontSize,
      highContrast: this.highContrast,
      autoScroll: this.autoScroll,
    }));
  }

  setFontSize = (size: number) => {
    this.fontSize = Math.min(Math.max(12, size), 24);
    this.saveSettings();
  };

  toggleHighContrast = () => {
    this.highContrast = !this.highContrast;
    this.saveSettings();
  };

  toggleAutoScroll = () => {
    this.autoScroll = !this.autoScroll;
    this.saveSettings();
  };
}

export const accessibilityStore = new AccessibilityStore();