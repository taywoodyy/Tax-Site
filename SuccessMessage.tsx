import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SuccessMessage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Submission Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for submitting your tax information. We have received your data and will process it accordingly.
      </p>
      <p className="text-gray-600">
        You will receive a confirmation email shortly with further instructions.
      </p>
    </div>
  );
};