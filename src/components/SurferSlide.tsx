import { HTMLProps } from 'react';
import { useCodeSurferSlideID } from '../hooks/useCodeSurferSlideID';

export type SurferSlideProps = HTMLProps<HTMLElement>;

export function SurferSlide(props: SurferSlideProps) {
  const { children, ...rest } = props;
  const slideID = useCodeSurferSlideID();

  return (
    <section {...rest} data-code-surfer={slideID}>
      {children}
    </section>
  );
}
