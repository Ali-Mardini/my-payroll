import { UserConfig } from 'vitest/config';

const vitestConfig: UserConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      
      exclude: [
        '**/node_modules/**',
        '**/build/**',
        '**/coverage/**',
        'my-payroll/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
      ],
    },
  },
};

export default vitestConfig;
