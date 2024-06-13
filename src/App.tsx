import { createContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Provider } from "mobx-react-lite";
export const StoreContext = createContext(stores);

import "./App.css";
import { stores } from "./modules";
import Page from "./Page";

function App() {
  const [count, setCount] = useState(0);

  return (
    <StoreContext.Provider value={stores}>
      <Page />
    </StoreContext.Provider>
  );
}

export default App;
