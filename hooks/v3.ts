import { useEffect, useRef, useState } from "react";
import { releaseProxy, wrap } from "comlink";

export function useWorkerV3(url: URL) {
  const [_, forceRender] = useState(1);
  const instance = useRef<Worker>();
  const wrapped = useRef<any>();

  useEffect(() => {
    if (instance.current && wrapped.current) return;

    const w = new Worker(url);

    instance.current = w;
    wrapped.current = wrap(w);

    forceRender((v) => v + 1);

    return () => {
      if (instance.current) {
        instance.current.terminate();
      }

      if (wrapped.current) {
        wrapped.current[releaseProxy]();
      }
    };
  }, [url]);

  return [wrapped.current, instance.current];
}
