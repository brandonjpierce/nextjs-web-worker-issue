import { useEffect, useRef, useState } from "react";
import { releaseProxy, wrap } from "comlink";

export function useWorkerV1(factory: () => Worker) {
  const [_, forceRender] = useState(1);
  const instance = useRef<Worker>();
  const wrapped = useRef<any>();

  useEffect(() => {
    if (instance.current && wrapped.current) return;

    const f = factory();

    instance.current = f;
    wrapped.current = wrap(f);

    forceRender((v) => v + 1);

    return () => {
      if (instance.current) {
        instance.current.terminate();
      }

      if (wrapped.current) {
        wrapped.current[releaseProxy]();
      }
    };
  }, [factory]);

  return [wrapped.current, instance.current];
}

export function createWorkerFactoryV1(pathToWorker: string) {
  return () => new Worker(new URL(pathToWorker, import.meta.url));
}

export function createWorkerFactoryV2(url: URL) {
  return () => new Worker(url);
}
