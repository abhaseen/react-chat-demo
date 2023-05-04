import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { SOCKET_ACTIONS } from "../../constants/SocketActions";
import styles from "./styles.module.css";

type Props = {
  socket: Socket;
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
};

export function Home(props: Props) {
  const navigate = useNavigate();

  function handleJoinRoom(e: FormEvent) {
    if (props.username === "" || props.roomId === "") {
      return;
    }
    e.preventDefault();
    props.socket.emit(SOCKET_ACTIONS.joinRoom, props.roomId);
    navigate(`/chat/${props.roomId}`);
  }

  return (
    <div>
      <h1 className={styles.title}>Join A Room</h1>
      <form className={styles.joinRoomForm} onSubmit={(e) => handleJoinRoom(e)}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          required
          value={props.username}
          onChange={(e) => props.setUserName(e.target.value)}
        />
        <TextField
          id="roomId"
          label="Room"
          variant="outlined"
          required
          value={props.roomId}
          onChange={(e) => props.setRoomId(e.target.value)}
        />
        <Button variant="outlined" type="submit">
          Join
        </Button>
      </form>
    </div>
  );
}
