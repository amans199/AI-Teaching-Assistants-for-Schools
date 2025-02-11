import { makeAutoObservable } from 'mobx';

export class ThemeStore {
  theme: 'light' | 'dark' = 'light';

  constructor() {
    makeAutoObservable(this);
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      this.theme = savedTheme;
    } else {
      this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.applyTheme();
  }

  toggleTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  };

  private applyTheme() {
    document.documentElement.classList.toggle('dark', this.theme === 'dark');
  }
}

export const themeStore = new ThemeStore();