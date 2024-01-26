import { useContext } from 'react';
import { revealJSContext } from '../contexts/revealjs-context.js';

export function useRevealJSInstance() {
  return useContext(revealJSContext);
}
