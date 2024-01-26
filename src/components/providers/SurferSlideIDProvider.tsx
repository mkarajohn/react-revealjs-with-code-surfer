import React, { useState, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { codeSurferSlideContext } from '../../contexts/code-surfer-slide-context.js';

export type SurferSlideIDProviderProps = {
  children: ((x: string) => ReactNode) | ReactNode | (((x: string) => ReactNode) | ReactNode)[];
  id?: string;
};

export function SurferSlideIDProvider(props: SurferSlideIDProviderProps) {
  const [uniqueID] = useState(props.id || uuidv4());

  return (
    <codeSurferSlideContext.Provider value={uniqueID}>
      {React.Children.map(props.children, (child) => {
        return typeof child === 'function' ? child(uniqueID) : child;
      })}
    </codeSurferSlideContext.Provider>
  );
}
