import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Peer } from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";

function App() {
  const [friendId, setFriendId] = useState("");
  const [msg, setMsg] = useState("");
  const myId = uuidv4();

  let { current } = useRef(myId);

  // console.log(current);

  const peer = useMemo(() => {
    return new Peer(current);
  }, [current]);

  const handleConnect = () => {
    const conn = peer.connect(friendId);

    conn.on("open", () => {
      conn.send("hi!");
    });
  };

  const handleMsg = () => {
    const conn = peer.connect(friendId);

    conn.on("open", () => {
      conn.send(msg);
    });

    setMsg("");
  };

  useEffect(() => {
    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    });
  }, [peer]);

  return (
    <div className="App">
      <br />
      <br />
      <input
        onChange={(e) => {
          setFriendId(e.target.value);
        }}
        value={friendId}
      />
      <button onClick={handleConnect}>connect</button>
      <br />
      <br />
      <input
        placeholder="msg"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />

      <button onClick={handleMsg}>connect</button>
      <div>
        my id: <strong> {current}</strong>
      </div>
    </div>
  );
}

export default App;
