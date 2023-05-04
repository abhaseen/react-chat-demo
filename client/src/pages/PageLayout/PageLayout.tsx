import { Outlet } from "react-router-dom";
import { Socket } from "socket.io-client";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./styles.module.css";

type Props = {
  socket: Socket;
  roomId: string;
};

export function PageLayout(props: Props) {
  return (
    <div className={styles.layoutContainer}>
      <NavBar socket={props.socket} roomId={props.roomId} />
      <Outlet />
    </div>
  );
}
