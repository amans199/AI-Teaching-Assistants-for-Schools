import { observer } from "mobx-react-lite";
import {
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Eye,
  ArrowDown,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { themeStore } from "@/stores/ThemeStore";
import { accessibilityStore } from "@/stores/AccessibilityStore";

export const Toolbar = observer(() => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/50 p-2 rounded-lg shadow-lg border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={themeStore.toggleTheme}
              className="h-[60px] w-[60px] hover:bg-accent relative"
            >
              {themeStore.theme === "light" ? (
                <Sun className="h-6 w-6 text-amber-500" />
              ) : (
                <Moon className="h-6 w-6 text-slate-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="my-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                accessibilityStore.setFontSize(accessibilityStore.fontSize + 1)
              }
              className="h-[60px] w-[60px] hover:bg-accent relative"
            >
              <ZoomIn className="h-6 w-6 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Increase font size</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                accessibilityStore.setFontSize(accessibilityStore.fontSize - 1)
              }
              className="h-[60px] w-[60px] hover:bg-accent relative"
            >
              <ZoomOut className="h-6 w-6 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Decrease font size</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="my-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={accessibilityStore.toggleHighContrast}
              className={cn(
                "h-[60px] w-[60px] hover:bg-accent relative",
                accessibilityStore.highContrast && "bg-accent"
              )}
            >
              <Eye className="h-6 w-6 text-blue-500" />
              <span className="absolute -top-1 right-2 w-3 h-3">
                {accessibilityStore.highContrast ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <X className="w-6 h-6 text-red-500" />
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle high contrast</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={accessibilityStore.toggleAutoScroll}
              className={cn(
                "h-[60px] w-[60px] hover:bg-accent relative",
                accessibilityStore.autoScroll && "bg-accent"
              )}
            >
              <ArrowDown className="h-6 w-6 text-blue-500" />
              <span className="absolute -top-1 right-2 w-3 h-3">
                {accessibilityStore.autoScroll ? (
                  <Check className="w-6 h-6 text-green-500" />
                ) : (
                  <X className="w-6 h-6 text-red-500" />
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle auto-scroll</p>
          </TooltipContent>
        </Tooltip>

        {/* <Separator className="my-1" /> */}

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-[60px] w-[60px] hover:bg-accent relative"
            >
              <Upload className="h-6 w-6 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Upload audio file</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-[60px] w-[60px] hover:bg-accent relative"
            >
              <Volume2 className="h-6 w-6 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Text-to-speech</p>
          </TooltipContent>
        </Tooltip> */}
      </div>
    </TooltipProvider>
  );
});
