"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = "max-w-lg",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div
        className={`relative w-full ${maxWidth} bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-100 p-5">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                {icon}
              </div>
            )}
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content (Scrollable) */}
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
