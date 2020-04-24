import React from 'react';

import { ModalProvider } from "./components/common/Modal";
import GameScreen from "./components/screens/Game/GameScreen";

function App() {
  return (
    <div>
      <GameScreen auth={{type: "anonymous", nickname: "Rally"}} roomId={null} />
      <ModalProvider />
    </div>
  );
}

export default App;
