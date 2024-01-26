import { CodeSurfer as CodeSurferStandalone } from '@code-surfer/standalone';
import {
  base,
  dracula,
  duotoneDark,
  duotoneLight,
  github,
  nightOwl,
  oceanicNext,
  shadesOfPurple,
  ultramin,
  vsDark,
} from '@code-surfer/themes';
import React, { useEffect } from 'react';
import { useSpring } from 'use-spring';
import { useCodeSurferSlideID } from '../hooks/useCodeSurferSlideID.js';
import { useRevealJSInstance } from '../hooks/useRevealJSInstance.js';
import type { InputStep } from './types.js';

export type SurferCodeThemes =
  | 'base'
  | 'dracula'
  | 'duotoneDark'
  | 'duotoneLight'
  | 'github'
  | 'nightOwl'
  | 'oceanicNext'
  | 'shadesOfPurple'
  | 'ultramin'
  | 'vsDark';

function selectTheme(x: string) {
  switch (x) {
    case 'dracula':
      return dracula;
    case 'duotoneDark':
      return duotoneDark;
    case 'duotoneLight':
      return duotoneLight;
    case 'github':
      return github;
    case 'nightOwl':
      return nightOwl;
    case 'oceanicNext':
      return oceanicNext;
    case 'shadesOfPurple':
      return shadesOfPurple;
    case 'ultramin':
      return ultramin;
    case 'vsDark':
      return vsDark;
    case 'base':
    default:
      return base;
  }
}

export type SurferCodeProps = {
  steps: InputStep[];
  theme?: SurferCodeThemes;
  nav?: {
    next: KeyboardEvent['code'];
    previous: KeyboardEvent['code'];
  };
};

export function SurferCode(props: SurferCodeProps) {
  const {
    steps,
    theme = 'vsDark',
    nav = { next: 'BracketRight', previous: 'BracketLeft' },
  } = props;

  const revealInstance = useRevealJSInstance();
  const slideID = useCodeSurferSlideID();

  const [{ progress, teleport }, setProgress] = React.useState({
    progress: 0,
    teleport: true,
  });
  const [smoothProgress] = useSpring(progress, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
    teleport,
  });

  const max = steps.length - 1;

  useEffect(() => {
    function handleKeyboard(e: KeyboardEvent) {
      function navigate() {
        if (progress !== max && e.code === nav.next) {
          setProgress(({ progress }) => ({
            progress: Math.min(Math.floor(progress) + 1, max),
            teleport: false,
          }));
        }

        if (progress !== 0 && e.code === nav.previous) {
          setProgress(({ progress }) => ({
            progress: Math.max(Math.ceil(progress) - 1, 0),
            teleport: false,
          }));
        }
      }

      if (!revealInstance) {
        return;
      }

      if (slideID === '') {
        navigate();
      } else {
        const slide = revealInstance.getCurrentSlide();
        const currentSlideID = slide.dataset.codeSurfer;

        if (currentSlideID === slideID) {
          navigate();
        }
      }
    }

    window.addEventListener('keydown', handleKeyboard);

    return function () {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [max, nav.next, nav.previous, progress, revealInstance, slideID]);

  return (
    <CodeSurferStandalone progress={smoothProgress} steps={steps} theme={selectTheme(theme)} />
  );
}
