import { useIsMutating } from '@tanstack/react-query';
import { createPortal } from 'react-dom';


const GlobalLoadingIndicator = () => {
    const isMutating = useIsMutating();

    if (isMutating === 0) {
        return null;
    }

    return createPortal(
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700 z-50">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="text-sm font-medium animate-pulse text-blue-400">
                Loading data...
            </span>
        </div>,
        document.body
    
    );
}

export default GlobalLoadingIndicator;