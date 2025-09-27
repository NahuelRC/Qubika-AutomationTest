import { test as base } from '@playwright/test';

function randomEmail(prefix = 'qa', domain = 'qubika.com'): string {
  const n = Math.floor(Math.random() * 1_000_000);
  return `${prefix}+${Date.now()}-${n}@${domain}`;
}

type Creds = { email: string; password: string };

export const test = base.extend<{ creds: Creds }>({
  
  creds: async ({}, use) => {
    const creds = {
      email: randomEmail(),
      password: 'Test1234',
    };
    await use(creds);
  },
});

export const expect = test.expect;
