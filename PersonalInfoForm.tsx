import React from 'react';
import { useTaxStore } from '../store/taxStore';

export const PersonalInfoForm: React.FC = () => {
  const { personalInfo, setPersonalInfo } = useTaxStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      <form className="space-y-4">
        {[
          { id: 'firstName', label: 'First Name', type: 'text' },
          { id: 'lastName', label: 'Last Name', type: 'text' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'phone', label: 'Phone', type: 'tel' },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={personalInfo[id as keyof typeof personalInfo]}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        ))}
      </form>
    </div>
  );
};