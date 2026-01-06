'use client';

import { motion } from 'framer-motion';
import { STEPS } from '@/lib/types';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  completedSteps: number[];
}

export default function ProgressBar({ currentStep, completedSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress percentage */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-void-600">Progress</span>
          <span className="text-sm font-bold text-primary-600">{Math.round(progress)}%</span>
        </div>
        <div className="text-sm text-void-500">
          Step {currentStep} of {STEPS.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-void-200 rounded-full overflow-hidden mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-success-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Step indicators */}
      <div className="hidden md:flex justify-between">
        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const isPast = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center w-24">
              <motion.div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-lg
                  transition-all duration-300 border-2
                  ${isCompleted
                    ? 'bg-success-500 border-success-500 text-white'
                    : isCurrent
                      ? 'bg-primary-500 border-primary-500 text-white animate-pulse-glow'
                      : isPast
                        ? 'bg-primary-100 border-primary-300 text-primary-600'
                        : 'bg-void-100 border-void-300 text-void-400'
                  }
                `}
                whileHover={{ scale: 1.1 }}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.icon}
              </motion.div>
              <span className={`
                mt-2 text-xs text-center font-medium
                ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-void-400'}
              `}>
                {step.shortTitle}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step indicator */}
      <div className="flex md:hidden items-center justify-center gap-2">
        {STEPS.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`
                w-3 h-3 rounded-full transition-all
                ${isCompleted
                  ? 'bg-success-500'
                  : isCurrent
                    ? 'bg-primary-500 w-6'
                    : 'bg-void-300'
                }
              `}
            />
          );
        })}
      </div>
    </div>
  );
}
