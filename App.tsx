import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { IncomeForm } from './components/IncomeForm';
import { ExpenseForm } from './components/ExpenseForm';
import { ReasonableSalaryForm } from './components/ReasonableSalaryForm';
import { ProgressBar } from './components/ProgressBar';
import { SuccessMessage } from './components/SuccessMessage';
import { useTaxStore } from './store/taxStore';

const STEPS = {
  PERSONAL_INFO: 1,
  INCOME: 2,
  EXPENSES: 3,
  REASONABLE_SALARY: 4,
} as const;

function App() {
  const { currentStep, setCurrentStep, isSubmitted, setIsSubmitted } = useTaxStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessMessage />;
    }

    switch (currentStep) {
      case STEPS.PERSONAL_INFO:
        return <PersonalInfoForm />;
      case STEPS.INCOME:
        return <IncomeForm />;
      case STEPS.EXPENSES:
        return <ExpenseForm />;
      case STEPS.REASONABLE_SALARY:
        return <ReasonableSalaryForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const handleSubmit = async () => {
    const formData = useTaxStore.getState();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '1f92c914-e009-433f-9b52-9a3519f9ef26',
          subject: `Tax Information Submission - ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
          from_name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
          email: formData.personalInfo.email,
          message: JSON.stringify({
            personalInfo: formData.personalInfo,
            incomeInfo: formData.incomeInfo,
            expenseInfo: formData.expenseInfo,
            reasonableSalary: formData.reasonableSalary
          }, null, 2)
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">TaxCalc</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isSubmitted && <ProgressBar />}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mt-8">
          {renderStep()}
          
          {!isSubmitted && (
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;