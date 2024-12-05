import Chat from "./spec/Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
