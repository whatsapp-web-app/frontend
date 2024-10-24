import { ChangeEvent, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { useChatContext } from "../../hooks/useChatProvider.tsx";
import useAppSelector from "../../hooks/useAppSelector.tsx";

type Payload = {
  createMessageDto: CreateMessageDto;
  userId: string;
};

type CreateMessageDto = {
  text: string;
  chatId: string;
  receiverId: string[];
};

export default function SendMessage() {
  const [value, setValue] = useState("");
  const { user } = useAppSelector((state) => state.authSlice);
  const { selectedChat, setSelectedChat, handleChatTyping } = useChatContext();
  const socket = useMemo(() => io("http://192.168.18.38:8000"), []);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    socket.emit("typing-status", selectedChat?._id);
  }

  function handleSubmit() {
    if (!selectedChat) return;
    if (!user) return;

    const payload: Payload = {
      createMessageDto: {
        text: value,
        chatId: selectedChat._id,
        receiverId: selectedChat.participants
          .filter((c) => c._id !== user?._id)
          .map((c) => c._id),
      },
      userId: user._id,
    };
    socket.emit("createMessage", payload);
    setValue("");
  }

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("joinChat", selectedChat?._id);
      socket.on("message", (data: Message) => {
        setSelectedChat((prev) => ({
          ...prev!,
          messages: [...prev!.messages, data],
        }));
      });
      socket.on("typing", () => {
        handleChatTyping();
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-16 bg-white w-full flex items-center space-x-2 px-4">
      <div className="w-16"></div>
      <input
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Type a message"
        className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  );
}
