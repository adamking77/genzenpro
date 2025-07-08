import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GenZenConversationalForm from './GenZenConversationalForm';
import { Button } from '../ui/button';

interface SimpleQualificationModalProps {
  trigger?: React.ReactNode;
  triggerText?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const SimpleQualificationModal: React.FC<SimpleQualificationModalProps> = ({
  trigger,
  triggerText = 'Get Started',
  variant = 'outline',
  size = 'lg',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const defaultClassName = "font-light text-base px-8 py-3 border-2 border-foreground/30 rounded-full hover:scale-105 hover:bg-gradient-to-r hover:from-background hover:to-accent/30 transition-all duration-300";

  return (
    <>
      {/* Trigger Button */}
      {trigger ? (
        <div onClick={openModal} style={{ cursor: 'pointer' }}>
          {trigger}
        </div>
      ) : (
        <Button
          variant={variant}
          size={size}
          className={`${defaultClassName} ${className}`}
          onClick={openModal}
        >
          {triggerText}
        </Button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-x-hidden"
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] overflow-hidden bg-background border border-foreground/20 rounded-xl shadow-2xl mx-2"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-background border-2 border-foreground/30 hover:bg-foreground/10 hover:scale-105 transition-all duration-300 flex items-center justify-center group shadow-lg"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors duration-200"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>

              {/* Scrollable Content */}
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-0">
                  <GenZenConversationalForm onComplete={closeModal} isModal={true} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleQualificationModal;