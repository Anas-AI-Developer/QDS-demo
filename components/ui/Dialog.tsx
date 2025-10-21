
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { XCircle } from '../Icons';

interface DialogContextType {
    isOpen: boolean;
    onClose: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a Dialog");
    }
    return context;
}

interface DialogProps {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
    const onClose = () => onOpenChange(false);
    if (!open) return null;
    
    return (
        <DialogContext.Provider value={{ isOpen: open, onClose }}>
            {children}
        </DialogContext.Provider>
    );
};

const DialogOverlay: React.FC = () => (
    <div className="fixed inset-0 z-50 bg-black/80" />
);

const DialogContent: React.FC<{children: ReactNode; className?: string}> = ({ children, className }) => {
    const { onClose } = useDialog();
    return (
        <>
            <DialogOverlay />
            <div className={`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg ${className}`}>
                {children}
                <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </>
    );
}

const DialogHeader: React.FC<{children: ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
        {children}
    </div>
);

const DialogTitle: React.FC<{children: ReactNode; className?: string}> = ({ children, className }) => (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h2>
);

const DialogDescription: React.FC<{children: ReactNode; className?: string}> = ({ children, className }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
        {children}
    </p>
);

const DialogFooter: React.FC<{children: ReactNode; className?: string}> = ({ children, className }) => (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}>
        {children}
    </div>
);


export { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
