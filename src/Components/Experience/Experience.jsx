import React from "react";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "../stores/useGame";

function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);

  return (
    <>
      <Perf position="top-left" />

      <Lights />
      <Physics>
        <Level count={blocksCount} />
        <Player />
      </Physics>
    </>
  );
}

export default Experience;
