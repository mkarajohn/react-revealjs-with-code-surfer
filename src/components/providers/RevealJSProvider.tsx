import { useEffect, useRef, useState, type ReactNode } from 'react';
import RevealJS from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import { revealJSContext } from '../../contexts/revealjs-context';

export type RevealJSProviderProps = {
  children: ReactNode;
  config?: Omit<RevealJS.Options, 'viewDistance'>;
};

export function RevealJSProvider(props: RevealJSProviderProps) {
  const {
    children,
    config = {
      plugins: [RevealNotes],
      hash: true,
    },
  } = props;

  const [revealInstance, setRevealInstance] = useState<RevealJS.Api | null>(null);
  const status = useRef('uninitialized');

  useEffect(() => {
    if (!revealInstance && status.current === 'uninitialized') {
      const instance = new RevealJS({
        ...config,

        // You need the slides to not be display: none since the
        viewDistance: Infinity,
      });

      instance.initialize().then(() => {
        status.current = 'initialized';
        setRevealInstance(instance);
      });

      status.current = 'initializing';
    }

    if (revealInstance && status.current === 'initialized') {
      // fix navigation arrows
      revealInstance.sync();
    }

    return function () {
      if (revealInstance) {
        revealInstance.destroy();
        setRevealInstance(null);
        status.current = 'uninitialized';
      }
    };
  }, [revealInstance]);

  return <revealJSContext.Provider value={revealInstance}>{children}</revealJSContext.Provider>;
}
