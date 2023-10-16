import { useEffect, useState } from "react";
import { io } from "socket.io-client";


// const socket = io("http://localhost:3000");

function App() {
  const socket = io("https://chat-api-blue.vercel.app/");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }
    function onMessage(message) {
      console.log("message from server:", message);
      setMessages((messages) => [...messages, message]);

    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  });

  return (
    <div className="w-[600px] h-[460px]">
      <div className="h-[400px] w-[600px] bg-gray-400 rounded-t-lg p-10 flex flex-col justify-start overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className="w-[100%] h-[50px] rounded-lg">
            <p>{message}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const msg = e.target.msg.value;
          socket.emit("message", msg);
          e.target.msg.value = "";
        }}
        className="h-[60px] w-[600px] flex flex-row"
      >
        <input
          name="msg"
          placeholder="message"
          className="w-[500px] text-center rounded-bl-lg bg-gray-200"
          style={{ outline: "none" }}
        />
        <button className="w-[100px] bg-black text-white rounded-br-lg">
          Send
        </button>
      </form>
    </div>
  );
}

export default App
