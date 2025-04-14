import React from 'react';
import { useTaxStore } from '../store/taxStore';

export const ReasonableSalaryForm: React.FC = () => {
  const { reasonableSalary, setReasonableSalary } = useTaxStore();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Reasonable Salary</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          A reasonable salary is the amount that an S-Corporation owner should pay themselves as an employee of their business. 
          This salary should be comparable to what other businesses would pay for similar services in your industry.
        </p>
        <p className="text-gray-600 mb-4">
          The IRS requires S-Corporation owners to pay themselves a reasonable salary to prevent the avoidance of payroll taxes.
        </p>
      </div>
      <div>
        <label htmlFor="reasonableSalary" className="block text-sm font-medium text-gray-700">
          Your Reasonable Salary
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="reasonableSalary"
            value={reasonableSalary}
            onChange={(e) => setReasonableSalary(parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};