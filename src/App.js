import React from 'react';

import { ModalProvider } from "./components/common/Modal";
import GameScreen from "./components/screens/Game/GameScreen";

function App() {
  return (
    <div>
    <GameScreen announcement={
      <div>
        They were probably cursed by the <strong style={{color: "violet"}}>Death Witch</strong>
      </div>
    } />

    <ModalProvider />
    </div>
  );
}

export default App;
