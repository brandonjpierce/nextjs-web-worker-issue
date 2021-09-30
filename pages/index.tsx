import type { NextPage } from "next";
import { useEffect } from "react";
import {
  useWorkerV1,
  // useWorkerV2,
  useWorkerV3,
  // createWorkerFactoryV1,
  createWorkerFactoryV2,
} from "../hooks";

// const workerFactory1 = createWorkerFactoryV1("../workers/example.ts");

const workerFactory2 = createWorkerFactoryV2(
  new URL("../workers/example.ts", import.meta.url)
);

const workerFactory3 = () =>
  new Worker(new URL("../workers/example.ts", import.meta.url), {
    type: "module",
  });

const Home: NextPage = () => {
  // const [example1] = useWorkerV1(workerFactory1);
  const [example2] = useWorkerV1(workerFactory2);
  const [example3] = useWorkerV1(workerFactory3);
  // const [example4] = useWorkerV2("../workers/example.ts");
  const [example5] = useWorkerV3(
    new URL("../workers/example.ts", import.meta.url)
  );

  // console.log("Example 1", example1);
  console.log("Example 2", example2);
  console.log("Example 3", example3);
  // console.log("Example 4", example4);
  console.log("Example 5", example5);

  useEffect(() => {
    /**
     * NOTE: functions are split up here on purpose to debug easier
     */

    // async function run1() {
    // await example1.inc();
    // console.log("Example 1 count", await example1.counter);
    // }

    async function run2() {
      await example2.inc();
      console.log("Example 2 count", await example2.counter);
    }

    async function run3() {
      await example3.inc();
      console.log("Example 3 count", await example3.counter);
    }

    // async function run4() {
    // await example4.inc();
    // console.log("Example 4 count", await example4.counter);
    // }

    async function run5() {
      await example5.inc();
      console.log("Example 5 count", await example5.counter);
    }

    // if (example1) run1();
    if (example2) run2();
    if (example3) run3();
    // if (example4) run4();
    if (example5) run5();
  }, [
    // example1,
    example2,
    example3,
    // example4,
    example5,
  ]);

  return <div>Look in DevTools Console</div>;
};

export default Home;
