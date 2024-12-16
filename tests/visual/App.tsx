import Chat from "./spec/Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<Chat />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
