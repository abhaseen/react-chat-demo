import { Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ChatBubble } from "../../components/ChatBubble/ChatBubble";
import { SOCKET_ACTIONS } from "../../constants/SocketActions";
import { MessageData } from "../../interfaces/MessageData";
import styles from "./styles.module.css";

type Props = {
  socket: Socket;
  username: string;
};

export function ChatRoom(props: Props) {
  const { roomId = "" } = useParams();
  const [isConnected, setIsConnected] = useState(props.socket.connected);
  const [allMessages, setAllMessages] = useState<MessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    props.socket.on(SOCKET_ACTIONS.connect, () => {
      setIsConnected(true);
      props.socket.emit(SOCKET_ACTIONS.joinRoom, roomId);
    });

    props.socket.on(SOCKET_ACTIONS.disconnect, () => {
      setIsConnected(false);
    });

    props.socket.on(SOCKET_ACTIONS.chat, (msg) => {
      setAllMessages((existingMsgs) => [...existingMsgs, msg]);
    });

    return () => {
      props.socket.off(SOCKET_ACTIONS.connect);
      props.socket.off(SOCKET_ACTIONS.disconnect);
      props.socket.off(SOCKET_ACTIONS.chat);
    };
  }, [props.socket, props.username, roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    const messageData: MessageData = {
      id: props.socket.id,
      roomId: roomId,
      author: props.username,
      message: currentMessage,
    };

    e.preventDefault();
    if (currentMessage === "") {
      return;
    }
    props.socket.emit("chat", messageData);
    setCurrentMessage("");
  }

  return (
    <div>
      <h1 className={styles.title}>Chat Room: {roomId}</h1>

      <p className={styles.status}>
        Your status: {isConnected ? "Connected" : "Disconnected"}
      </p>

      {allMessages.length ? (
        <div className={styles.chatBubbleContainer}>
          {allMessages.map((data, idx) => (
            <ChatBubble
              key={idx}
              message={data}
              isSelf={props.username === data.author ? true : false}
            />
          ))}
          <div ref={chatEndRef}></div>
        </div>
      ) : null}

      <form
        className={styles.controlsContainer}
        onSubmit={(e) => handleSendMessage(e)}
      >
        <TextField
          id="message"
          label="Message"
          placeholder="Type your message here..."
          variant="outlined"
          sx={{ flexGrow: 1 }}
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <Button type="submit" variant="outlined">
          <Send />
        </Button>
      </form>
    </div>
  );
}
