import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ChatRoom } from "./pages/ChatRoom/ChatRoom";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { Home } from "./pages/Home/Home";
import { PageLayout } from "./pages/PageLayout/PageLayout";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout socket={socket} roomId={roomId} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <Home
              socket={socket}
              username={username}
              setUserName={setUsername}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          ),
        },
        {
          path: "chat/:roomId",
          element: <ChatRoom socket={socket} username={username} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
