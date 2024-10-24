import React, { useEffect, useMemo } from "react";
import useVisibilityChange from "../hooks/useVisibilityChange";
import {onMessage} from "@firebase/messaging";
import {messaging} from "../utils/firebase.ts";
import toast from "react-hot-toast";

interface NotificationContext {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  addNotification: (notification: NotificationOptions) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = React.createContext<NotificationContext>({
  count: 0,
  setCount: () => {},
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = React.useState(0);
  const [notifications, setNotifications] = React.useState<
    NotificationOptions[]
  >([]);

  const addNotification = (notification: NotificationOptions) => {
    setCount(count + 1);
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (id: number) => {
    console.log(id);
    setCount(count - 1);
  };

  const isForeground = useVisibilityChange();



  const value = useMemo(
    () => ({
      count,
      setCount,
      addNotification,
      removeNotification,
    }),
    [count, notifications]
  );

  useEffect(() => {
    onMessage(messaging,(payload)=>{
      console.log("Message received. ", payload);
      toast.success(` Message received ${payload.notification?.title}`);
      setCount(perv=>perv+1);
    })
  });

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return React.useContext(NotificationContext);
};
