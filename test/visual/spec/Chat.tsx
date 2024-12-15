import Chat from "@appflowy-chat/components/chat/index";
import { Switch } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/variables/dark.variables.css";
import "../styles/variables/light.variables.css";
const ChatTest = () => {
  const [searchParams] = useSearchParams();

  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleChangeSwitchMode(e: ChangeEvent<HTMLInputElement>) {
    handleChangeMode(e.target.checked);
  }

  function handleChangeMode(value: boolean) {
    document.documentElement.dataset.darkMode = `${value}`;
    setIsDarkMode(value);
  }

  useEffect(() => {
    const isDark = searchParams.get("dark");
    if (isDark === "true") {
      handleChangeMode(true);
    }
    return () => {};
  }, [searchParams]);

  return (
    <div className="w-full h-full flex">
      <div className="w-full max-w-[300px] p-4 border-r border-r-gray-500 max-h-full">
        Sidebar
        <hr className="mt-1" />
        <div className="py-2">
          <span>Theme mode: {isDarkMode ? "Dark" : "Light"}</span>
          <div>
            <Switch checked={isDarkMode} onChange={handleChangeSwitchMode} />
          </div>
        </div>
      </div>
      <Chat
        userAvatar={
          "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S-768x768.jpg"
        }
      />
    </div>
  );
};

export default ChatTest;
