import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChats, setShowChats] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChats(true)
    }
  };

  return (
    <div className="md:w-full">
      {!showChats ? (
        <div className=" md:w-full px-2">
          <div className=" md:w-1/3 bg-blue-100 my-32 mx-auto p-4 rounded-md">
            <div className="md:w-5/6  mx-auto">
              <p className="text-4xl text-center font-bold mb-6">Join Room</p>
              <span className="text-xl text-slate-600 font-bold">Username</span>
              <input
                className="border py-3 px-5 mt-1 mb-4 text-xl rounded-md w-full "
                type="text"
                placeholder="John...."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <span className="text-xl text-slate-600 font-bold">Room</span>
              <input
                className="w-full border mt-1 mb-4  py-3 px-5 text-xl rounded-md "
                type="text"
                placeholder="Room id.."
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <button
                className="my-4 rounded-md border py-2 px-5 w-full bg-green-600 text-xl text-white"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
