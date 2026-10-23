import { createContext } from 'react';

export const ApiErrorContext = createContext<((error: unknown) => void) | null>(null);
