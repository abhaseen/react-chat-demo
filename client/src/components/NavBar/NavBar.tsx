import { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { SOCKET_ACTIONS } from "../../constants/SocketActions";
import styles from "./styles.module.css";

type Props = {
  socket: Socket;
  roomId: string;
};

export function NavBar(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleExit(e: MouseEvent) {
    e.preventDefault();
    props.socket.emit(SOCKET_ACTIONS.leaveRoom, props.roomId);
    navigate("/");
  }

  return (
    <nav className={styles.topNav}>
      <div>
        <p>Logo</p>
      </div>

      <ul className={styles.navList}>
        <li>
          {location.pathname.includes("chat") ? (
            <button
              className={styles.navListLink}
              type="button"
              onClick={(e) => handleExit(e)}
            >
              Exit
            </button>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
