const Chat = () => {
  return (
    <div className="flex-auto flex flex-col overflow-auto h-full relative ">
      <div className="absolute top-0 left-0 h-full max-h-full flex flex-col w-full ">
        <header className="w-full flex-none px-4 py-3 flex items-center justify-between">
          <div className=" text-neutral-900  text-sm">Space Name... </div>
          <div>
            <button className="py-1.5 px-3 rounded-lg text-sm text-white font-medium bg-accent">
              Share
            </button>
          </div>
        </header>
        <div className="flex-auto w-full overflow-auto">
          <div className="h-[10000px]"></div>
        </div>
        <div className="footer h-20 w-full flex-none"></div>
      </div>
    </div>
  );
};

export default Chat;
