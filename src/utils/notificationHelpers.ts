import toast from "react-hot-toast";

interface NotificationOptions {
  title: string;
  body: string;
}

interface ToastNotification {
  title: string;
  description: string;
  status: string;
}

export const toastNotification = ({
  title,
  description,
  status,
}: ToastNotification) => {
  console.log(`Toast Notification: ${title} - ${description} - ${status}`);
  toast.success(`${title} - ${description} - ${status}`);
};

export const sendNativeNotification = ({
  title,
  body,
}: NotificationOptions) => {
  console.log(`Native Notification: ${title} - ${body}`);
};
