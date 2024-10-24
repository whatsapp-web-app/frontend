import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const setupNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    if (permission === "granted") {
      const token = await getToken(messaging);
      localStorage.setItem("firebaseToken", token);
    } else {
      console.log("Notification permission denied.");
      toast.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error setting up notifications:", error);
    toast.error("Error setting up notifications: " + error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Foreground Message:", payload);
  toast.success("Foreground Message: " + payload?.data?.message);
});

export { messaging, setupNotifications };
