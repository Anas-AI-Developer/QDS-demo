import React from 'react';
import { WorkflowEvent } from '../types';
import { Check, Clock } from './Icons';

interface ProcessFlowProps {
    history: WorkflowEvent[];
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ history }) => {
    
    const getStatusIcon = (status: 'completed' | 'in_progress' | 'pending') => {
        switch (status) {
            case 'completed':
                return <div className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center"><Check className="h-4 w-4 text-white" /></div>;
            case 'in_progress':
                return <div className="bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center"><Clock className="h-4 w-4 text-white animate-spin" /></div>;
            case 'pending':
                return <div className="bg-gray-300 dark:bg-gray-600 rounded-full h-6 w-6"></div>;
        }
    }

    return (
        <div className="space-y-6">
            {history.map((event, index) => (
                <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                        {getStatusIcon(event.status)}
                        {index < history.length - 1 && (
                            <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>
                        )}
                    </div>
                    <div className="pb-6">
                        <p className={`font-semibold ${event.status !== 'pending' ? 'text-foreground' : 'text-muted-foreground'}`}>{event.stage}</p>
                        {event.status !== 'pending' && (
                            <>
                                <p className="text-sm text-muted-foreground">{event.user} - {event.timestamp}</p>
                                {event.comments && <p className="text-sm italic text-muted-foreground mt-1">"{event.comments}"</p>}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProcessFlow;