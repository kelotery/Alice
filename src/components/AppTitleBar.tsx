import React, { useEffect, useState } from "react";
import { Minus, Square, X } from "lucide-react";

type WindowAPI = {
  minimize: () => void;
  toggleMaximize: () => void;
  close: () => void;
  isMaximized: () => Promise<boolean>;
  onMaximizeChanged: (cb: (maximized: boolean) => void) => void;
};

declare global { interface Window { marvisWindow?: WindowAPI; } }

const hasWindowAPI = (): boolean => typeof window !== "undefined" && !!window.marvisWindow;

const AppTitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  useEffect(() => {
    if (!hasWindowAPI()) return;
    window.marvisWindow!.isMaximized().then(setIsMaximized);
    window.marvisWindow!.onMaximizeChanged(setIsMaximized);
  }, []);
  if (!hasWindowAPI()) return null;
  const win = window.marvisWindow!;
  return (
    <div className="title-bar">
      <div className="title-bar__drag-region" />
      <div className="title-bar__controls">
        <button className="title-bar__btn title-bar__btn--minimize" onClick={() => win.minimize()} aria-label="Minimize">
          <Minus size={14} strokeWidth={2} />
        </button>
        <button className="title-bar__btn title-bar__btn--maximize" onClick={() => win.toggleMaximize()} aria-label={isMaximized ? "Restore" : "Maximize"}>
          <Square size={12} strokeWidth={2} />
        </button>
        <button className="title-bar__btn title-bar__btn--close" onClick={() => win.close()} aria-label="Close">
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default AppTitleBar;
