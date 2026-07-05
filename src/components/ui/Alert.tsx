import { createPortal } from "react-dom";

export interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Alert = ({ message, type, onClose }: AlertProps) => {
  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return createPortal(
    <div className={`fixed top-4 right-4 z-50 text-white p-4 rounded shadow-lg flex items-center justify-between min-w-[300px] ${bgColors[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold hover:opacity-80">
        ✕
      </button>
    </div>,
    document.body
  );
};