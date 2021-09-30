import { expose } from "comlink";

const example = {
  counter: 0,
  inc() {
    this.counter++;
  },
};

expose(example);
