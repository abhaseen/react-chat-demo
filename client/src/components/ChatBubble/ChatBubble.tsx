import { MessageData } from "../../interfaces/MessageData";
import styles from "./styles.module.css";

type Props = {
  message: MessageData;
  isSelf?: boolean;
};

export function ChatBubble({ message, isSelf = false }: Props) {
  const botAuthorityId = "room-bot-1000";

  return (
    <div>
      <p
        className={`
        ${styles.messageContainer} 
        ${message.id === botAuthorityId ? styles.messageContainerBot : null} 
        ${isSelf ? styles.messageContainerSelf : null}
        `}
      >
        {message.message}
      </p>
      <p
        className={`
        ${styles.author} 
        ${message.id === botAuthorityId ? styles.authorBot : null} 
        ${isSelf ? styles.authorSelf : null}
        `}
      >
        {isSelf ? "You" : message.author}
      </p>
    </div>
  );
}
