import { create } from "zustand";

export default create(() => {
  return {
    blocksCount: 5,

    //phases
    phase: "ready",
  };
});
