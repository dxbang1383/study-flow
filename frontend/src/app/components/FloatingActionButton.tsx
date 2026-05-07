import { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, CheckSquare, Bell, BookOpen, Move } from 'lucide-react';

interface FloatingActionButtonProps {
  onAction: (type: 'task' | 'reminder' | 'subject') => void;
}

export default function FloatingActionButton({ onAction }: FloatingActionButtonProps) {
  const [position, setPosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const fabRef = useRef<HTMLDivElement>(null);

  const actions = [
    { type: 'task' as const, icon: CheckSquare, label: 'Create Task', color: 'bg-blue-500' },
    { type: 'reminder' as const, icon: Bell, label: 'Create Reminder', color: 'bg-purple-500' },
    { type: 'subject' as const, icon: BookOpen, label: 'Create Subject', color: 'bg-indigo-500' },
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX - dragOffsetRef.current.x;
    const newY = e.clientY - dragOffsetRef.current.y;

    const maxX = window.innerWidth - 80;
    const maxY = window.innerHeight - 80;

    setPosition({
      x: Math.max(20, Math.min(newX, maxX)),
      y: Math.max(20, Math.min(newY, maxY)),
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button.action-btn')) return;

    setIsDragging(true);
    let currentX = position.x;
    let currentY = position.y;

    if (currentX === null || currentY === null) {
      if (fabRef.current) {
        const rect = fabRef.current.getBoundingClientRect();
        currentX = rect.left;
        currentY = rect.top;
        setPosition({ x: currentX, y: currentY });
      } else {
        currentX = window.innerWidth - 80;
        currentY = window.innerHeight - 80;
      }
    }

    dragOffsetRef.current = {
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (prev.x === null || prev.y === null) return prev;
        
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - 80;
        return {
          x: Math.max(20, Math.min(prev.x, maxX)),
          y: Math.max(20, Math.min(prev.y, maxY)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={fabRef}
      className="fixed z-50 group"
      style={{
        left: position.x !== null ? `${position.x}px` : 'auto',
        top: position.y !== null ? `${position.y}px` : 'auto',
        right: position.x === null ? '32px' : 'auto',
        bottom: position.y === null ? '32px' : 'auto',
      }}
    >
      <div className="relative flex flex-col items-end">
        {/* Action Buttons - Show on hover */}
        {!isDragging && (
          <div className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {/* Bridge element to maintain hover state across the gap */}
            <div className="absolute -bottom-3 left-0 right-0 h-3" />
            
            {actions.map((action) => (
              <button
                key={action.type}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(action.type);
                }}
                className={`${action.color} action-btn text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-3`}
              >
                <action.icon className="w-5 h-5" />
                <span className="whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <div
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 ${!isDragging && 'group-hover:rotate-45'}`}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          {isDragging ? (
            <Move className="w-6 h-6 text-white" />
          ) : (
            <Plus className="w-6 h-6 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
