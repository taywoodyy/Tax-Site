import React from 'react';
import { useTaxStore } from '../store/taxStore';

export const ExpenseForm: React.FC = () => {
  const { expenseInfo, setExpenseInfo } = useTaxStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseInfo({ ...expenseInfo, [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">S-Corp Expenses</h2>
      <form className="space-y-4">
        {[
          { id: 'generalExpenses', label: 'General Expenses' },
          { id: 'ownerWithdrawals', label: "Owner's Withdrawals" },
          { id: 'extraDistribution', label: 'Extra Fund Distribution' },
        ].map(({ id, label }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id={id}
                name={id}
                value={expenseInfo[id as keyof typeof expenseInfo]}
                onChange={handleChange}
                className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};