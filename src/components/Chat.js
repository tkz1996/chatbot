import { w3cwebsocket as Socket } from "websocket";
import { useState, useEffect } from "react";

const client = new Socket("ws://54.169.158.2:80");
const ec2Uri = "http://ec2-54-169-158-2.ap-southeast-1.compute.amazonaws.com";
// const client = new Socket("ws://localhost:80");
// const ec2Uri = "http://localhost";

const Chat = ({ userName }) => {
  // defining states that will be used in the client
  const [username] = useState(userName);
  // message from user to be sent to BE
  const [myMessage, setMyMessage] = useState("");
  // all messages so far in chat history
  const [messages, setMessages] = useState([]);

  // send message and set current chat message bar to empty
  const onSend = () => {
    client.send(
      JSON.stringify({
        type: "message",
        message: myMessage,
        userName,
      })
    );
    setMyMessage("");
  };

  // useEffect for inital chat history rendering for given username
  useEffect(() => {
    const setChatHistory = (async function () {
      const response = await fetch(ec2Uri + '/chat/history', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": username
        })
      });
      const data = await response.json();
      for (let key in data) {
        setMessages((messages) => [
          ...messages,
          {
            message: data[key].message,
            userName: data[key].userName,
          },
        ]);
      }
    });
    setChatHistory();
  }, [username]);

  // useEffect for triggering message update upon websocket message
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages((messages) => [
        ...messages,
        {
          message: data.message,
          userName: data.userName,
        },
      ]);
    };
  }, []);

  return (
    <>
      <div className="title">Socket Chat Username: {userName}</div>
      <div className="messages">
        {messages.map((message, key) => (
          <div
            key={key}
            className={`message ${userName === message.userName ? "flex-end" : "flex-start"
              }`}
          >
            <section>{message.userName[0].toUpperCase()}</section>
            <h4>{message.userName + ":"}</h4>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <div className="bottom form">
        <input
          type="myMessage"
          value={myMessage}
          onChange={(e) => setMyMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSend()}
          placeholder="Message"
        ></input>
        <button onClick={onSend}>Send</button>
      </div>
    </>
  );
};
export default Chat;
