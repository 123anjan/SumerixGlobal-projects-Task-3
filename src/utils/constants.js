export const DEPARTMENTS = ['Engineering', 'Accounting', 'Sales', 'Marketing', 'Finance', 'Design'];

export const JOB_TITLES = {
  Engineering: ['Software Engineer', 'QA Engineer'],
  Accounting: ['Accountant', 'Auditor'],
  Sales: ['Sales Consultant', 'Account Manager'],
  Marketing: ['Communication Manager', 'Marketing Coordinator'],
  Finance: ['Financial Supervisor', 'Budget Analyst'],
  Design: ['Product Designer', 'UX Researcher'],
};

// "ed3:" prefix so Task 2 and Task 3 never share browser storage on the same github.io origin
export const STORAGE_KEYS = {
  theme: 'ed3:theme',
  auth: 'ed3:auth',
  employees: 'ed3:employees',
  attendance: 'ed3:attendance',
};