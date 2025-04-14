import { create } from 'zustand';

type TaxState = {
  currentStep: number;
  isSubmitted: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  incomeInfo: {
    personalIncome: number;
    sCorpIncome: number;
  };
  expenseInfo: {
    generalExpenses: number;
    ownerWithdrawals: number;
    extraDistribution: number;
  };
  reasonableSalary: number;
  setCurrentStep: (step: number) => void;
  setPersonalInfo: (info: TaxState['personalInfo']) => void;
  setIncomeInfo: (info: TaxState['incomeInfo']) => void;
  setExpenseInfo: (info: TaxState['expenseInfo']) => void;
  setReasonableSalary: (salary: number) => void;
  setIsSubmitted: (value: boolean) => void;
};

export const useTaxStore = create<TaxState>((set) => ({
  currentStep: 1,
  isSubmitted: false,
  personalInfo: { firstName: '', lastName: '', email: '', phone: '' },
  incomeInfo: { personalIncome: 0, sCorpIncome: 0 },
  expenseInfo: { generalExpenses: 0, ownerWithdrawals: 0, extraDistribution: 0 },
  reasonableSalary: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  setPersonalInfo: (info) => set({ personalInfo: info }),
  setIncomeInfo: (info) => set({ incomeInfo: info }),
  setExpenseInfo: (info) => set({ expenseInfo: info }),
  setReasonableSalary: (salary) => set({ reasonableSalary: salary }),
  setIsSubmitted: (value) => set({ isSubmitted: value }),
}));