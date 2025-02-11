import { observer } from 'mobx-react-lite';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { themeStore } from '@/stores/ThemeStore';

export const ThemeToggle = observer(() => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={themeStore.toggleTheme}
      className="w-10 h-10 rounded-full"
    >
      {themeStore.theme === 'light' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});