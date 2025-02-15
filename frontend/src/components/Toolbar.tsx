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
      <div className="flex items-center gap-2 mx-auto bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/50 p-2 rounded-lg shadow-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={themeStore.toggleTheme}
              className="h-[40px] w-[40px] p-2 hover:bg-accent relative"
            >
              {themeStore.theme === "light" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-400" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                accessibilityStore.setFontSize(accessibilityStore.fontSize + 1)
              }
              className="h-[40px] w-[40px] p-2 hover:bg-accent relative"
            >
              <ZoomIn className="h-4 w-4 text-blue-500" />
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
              className="h-[40px] w-[40px] p-2 hover:bg-accent relative"
            >
              <ZoomOut className="h-4 w-4 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Decrease font size</p>
          </TooltipContent>
        </Tooltip>

        <Separator className="mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={accessibilityStore.toggleHighContrast}
              className={cn("h-[40px] w-[40px] p-2 hover:bg-accent relative")}
            >
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="absolute -top-1 right-2 w-3 h-3">
                {accessibilityStore.highContrast ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
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
              className={cn("h-[40px] w-[40px] p-2 hover:bg-accent relative")}
            >
              <ArrowDown className="h-4 w-4 text-blue-500" />
              <span className="absolute -top-1 right-2 w-3 h-3">
                {accessibilityStore.autoScroll ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Toggle auto-scroll</p>
          </TooltipContent>
        </Tooltip>

        {/* <Separator className="mx-1" /> */}

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-[40px] w-[40px] p-2 hover:bg-accent relative"
            >
              <Upload className="h-4 w-4 text-blue-500" />
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
              className="h-[40px] w-[40px] p-2 hover:bg-accent relative"
            >
              <Volume2 className="h-4 w-4 text-blue-500" />
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
