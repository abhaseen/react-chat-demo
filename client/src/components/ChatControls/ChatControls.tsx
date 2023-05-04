import { Room, Send } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  handleSubmitMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function ChatControls({ handleSubmitMessage }: Props) {
  const [chatMessage, setChatMessage] = useState("");

  return (
    <form
      className={styles.controlsContainer}
      onSubmit={(e) => handleSubmitMessage(e)}
    >
      <TextField
        id="message"
        label="Message"
        placeholder="Type your message here..."
        variant="outlined"
        sx={{ flexGrow: 1 }}
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
      />
      <Button type="submit" variant="text">
        <Send />
      </Button>
      <Button type="button" variant="text">
        <Room />
      </Button>
    </form>
  );
}
