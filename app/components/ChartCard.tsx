"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  preview?: React.ReactNode;
  chartId: string;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  children, 
  preview, 
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCollapse();
    }
  };

  const modal = isExpanded && mounted ? createPortal(
    <div 
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={handleCollapse}
            className="p-2 hover:bg-white/80 rounded-full transition-all duration-200 text-gray-600 hover:text-gray-800"
            title="Kapat (ESC)"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-auto max-h-[calc(95vh-120px)]">
          {React.isValidElement(children) 
            ? React.cloneElement(children as React.ReactElement<any>, { 
                isPreview: false, 
                height: undefined 
              })
            : children
          }
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div className={`bg-white p-6 rounded-3xl shadow-xl border border-gray-100 relative group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 truncate pr-2">{title}</h3>
          <button
            onClick={handleExpand}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
            title="Büyüt"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-600">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
        <div className="h-80 overflow-hidden" onClick={handleExpand}>
          {preview || children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"></div>
      </div>
      {modal}
    </>
  );
};

export default ChartCard; 