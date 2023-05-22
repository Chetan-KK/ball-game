import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./Components/Experience/Experience";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Components/Interface/Interface";

function App() {
  return (
    <div className="App">
      <KeyboardControls
        map={[
          { name: "forword", keys: ["ArrowUp", "KeyW"] },
          { name: "backword", keys: ["ArrowDown", "KeyS"] },
          { name: "leftword", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightword", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <div className="canvasWrapper">
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [2.5, 4, 6],
            }}
          >
            <Experience />
          </Canvas>
          <Interface />
        </div>
      </KeyboardControls>
    </div>
  );
}

export default App;
