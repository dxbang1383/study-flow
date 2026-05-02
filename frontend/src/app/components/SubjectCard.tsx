import { useDrag } from 'react-dnd';
import { Subject } from './store';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'subject',
    item: { id: subject.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={(e) => {
        if (!isDragging) {
          onClick();
        }
      }}
      className={`px-6 py-3 rounded-full cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
        isDragging ? 'opacity-50 cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        backgroundColor: subject.color,
      }}
    >
      <span className="font-medium text-gray-800">{subject.name}</span>
    </div>
  );
}
