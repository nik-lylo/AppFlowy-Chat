import { TextField } from "@mui/material";
import ButtonIcon from "../button-icon";
import IconArrowUp from "@appflowy-chat/assets/icons/arrow-up.svg?react";
import "./index.css";

const index = () => {
  return (
    <div className="w-full border border-primary-gray rounded-lg focus-within:border-accent transition-colors">
      {/* prettier-ignore */}
      <TextField
        id="appflowy-chat-input"
        placeholder="Ask AppFlowy AI"
        multiline
        fullWidth
        className="appflowy-chat-input-root"
        
      />
      <div className="flex justify-between px-2">
        <button className="text-primary-gray2 p-1 text-xs">
          Format response
        </button>
        <div>
          <ButtonIcon
            className="text-accent disabled:text-primary-gray"
            icon={<IconArrowUp className="w-full h-full" />}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
