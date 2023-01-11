import React, { useState, useEffect } from "react";
import Inbox from "../components/Inbox";
import OpenNotification from "../components/OpenNotification";
import Preview from "../components/Preview";
import Header from "../components/Header";
import { statusSocket, chatSocket } from "../ws/ws";

const Messenger: React.FC = () => {

  const [inboxToggle, setInboxToggle] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    chatSocket.onmessage = (e) =>  console.log(e) 
  })

  return (
    <div 
      className="min-h-screen max-w-screen font-sans flex items-center justify-center bg-slate-100 text-black"
      style={{
        paddingTop:'50px'
      }}
    >
      <OpenNotification />
      <Header />
      <div 
        className="md:w-[63rem] w-full md:h-[91vh] h-screen grid grid-rows-1 grid-cols-6 md:rounded-xl bg-white shadow-lg shadow-slate-400 mt-5" 
        
      >
        <Preview
          inboxToggle={inboxToggle}
          setInboxToggle={setInboxToggle}
          setUsername={setUsername}
          
        />

        <Inbox
          username={username}
          inboxToggle={inboxToggle}
          setInboxToggle={setInboxToggle}
        />
      </div>
    </div>
  );
};

export default Messenger;
