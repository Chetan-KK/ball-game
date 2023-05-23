import React from "react";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Level from "./Level";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import useGame from "../stores/useGame";
import Effects from "./Effects";

function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <Lights />
      <Physics>
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Effects />
    </>
  );
}

export default Experience;
