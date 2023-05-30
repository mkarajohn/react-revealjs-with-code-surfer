type Maybe<T> = T | null | undefined;
interface Flavoring<FlavorT> {
  _type?: FlavorT;
}
type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

declare module 'code-surfer-types' {
  import { ReactNode } from 'react';

  export interface InputStep {
    code: string;
    /*
     * number -> line
     * numberA:numberB -> from line A to line B
     * numberA,numberB,numberC -> line A and line B and line C
     * [] -> columns
     * numberA[numberB] -> column B from line A
     * numberA[numberB:numberC] -> column B through column C from line A
     * numberA[numberB,numberC] -> column B and column C from line A
     * See https://github.com/pomber/code-surfer#focus
     */
    focus?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    lang?: string;
    showNumbers?: boolean;
  }

  type LineKey = Flavor<number, 'LineKey'>;
  type LineIndex = Flavor<number, 'LineIndex'>;
  type StepIndex = Flavor<number, 'StepIndex'>;

  export interface Step {
    lines: LineKey[];
    longestLineIndex: LineIndex;
    focus: Record<LineIndex, true | StepIndex[]>;
    focusCenter: number;
    focusCount: number;
    title?: string;
    subtitle?: string;
    dimensions?: {
      paddingTop: number;
      paddingBottom: number;
    };
  }

  export interface Dimensions {
    lineHeight: number;
    containerHeight: number;
    containerWidth: number;
    contentHeight?: number;
    contentWidth: number;
  }

  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
}

declare module 'shell-quote' {
  export function parse(s: string): string[];
}
