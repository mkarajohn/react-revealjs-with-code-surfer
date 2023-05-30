import { useContext } from 'react';
import { revealJSContext } from '../contexts/revealjs-context';

export function useRevealJSInstance() {
  return useContext(revealJSContext);
}
