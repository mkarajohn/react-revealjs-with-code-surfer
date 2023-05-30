import { createContext } from 'react';
import RevealJS from 'reveal.js';

export const revealJSContext = createContext<RevealJS.Api | null>(null);
