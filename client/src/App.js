import {useEffect, useState} from "react";

// @socket
import io from "socket.io-client";

// @styles
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", {message, room});
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        })
    }, [socket]);

    return (
        <div className="App">
            <header className="App-header">
                <input placeholder="Room number..."
                       onChange={(e) => {
                           setRoom(e.target.value)
                       }}
                />
                <button onClick={joinRoom}>
                    Join room
                </button>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message..."/>
                <button onClick={sendMessage}>Send message</button>
                <h1>{messageReceived}</h1>
            </header>
        </div>
    );
}

export default App;
