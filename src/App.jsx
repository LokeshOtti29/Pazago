import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Chatwindow from "./components/Chatwindow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Chatwindow />
    </>
  );
}

export default App;
