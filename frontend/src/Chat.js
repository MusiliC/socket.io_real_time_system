import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { MdSend } from "react-icons/md";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleClick = async () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        new_message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="md:w-full p-3.5">
      <div className=" md:w-1/3 mx-auto my-20 rounded-md border-solid border-2 border-slate-400 ">
        <div className="" id="chat-header">
          <p className="text-2xl text-center py-3  text-white  font-bold bg-black ">
            Live Chat
          </p>
        </div>
        <div id="chat-body" className="h-[350px]">
        <ScrollToBottom className="message-container">
          {messageList.map((message) => (
            <div className="message">
              <div
                className="flex flex-col"
                id={username === message.author ? "you" : "other"}
              >
                <div className="message-content bg-green-600 py-1 px-5 rounded-sm text-white">
                  <p className="2xl font-bold">{message.new_message}</p>
                </div>

                <div className="message-meta flex flex-row  space-x-1 ">
                  <p id="time">{message.time}</p>
                  <p id="author">{message.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>

        </div>
        <div className=" flex  " id="chat-footer">
          <input
            className="w-full border border-r-0  mt-1  py-2 px-5  "
            type="text"
            placeholder="hey.."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button className="border pt-0 pb-0.5 bg-blue-200 hover:bg-green-600 ">
            <MdSend
              className=' mx-2 hover:color-white" self-center'
              size="3.2rem"
              color="white"
              onClick={handleClick}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
