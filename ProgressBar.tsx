import React from 'react';
import { useTaxStore } from '../store/taxStore';

export const ProgressBar: React.FC = () => {
  const { currentStep, setCurrentStep } = useTaxStore();

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Income' },
    { number: 3, title: 'Expenses' },
    { number: 4, title: 'Reasonable Salary' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <button
              onClick={() => setCurrentStep(step.number)}
              className={`flex flex-col items-center ${
                currentStep >= step.number ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.number
                    ? 'border-emerald-600 bg-emerald-600 text-white'
                    : 'border-gray-300'
                }`}
              >
                {step.number}
              </div>
              <span className="mt-2 text-sm font-medium">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};