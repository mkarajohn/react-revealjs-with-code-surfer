import { useContext } from 'react';
import { codeSurferSlideContext } from '../contexts/code-surfer-slide-context';

export function useCodeSurferSlideID() {
  return useContext(codeSurferSlideContext);
}
