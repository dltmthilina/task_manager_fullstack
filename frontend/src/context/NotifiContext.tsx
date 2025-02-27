import { createContext, ReactNode, useContext, useState } from "react";

interface NotificationDataType {
  message?: string;
  code?: number;
  type: "success" | "info" | "warning" | "error";
  isShow: boolean;
}

interface NotifiContextValue {
  notification: NotificationDataType;
  showNotification: (data: NotificationDataType) => void;
}

const NotifiContext = createContext<NotifiContextValue | undefined>(undefined);

export const NotifiProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationDataType>({
    message: "Test",
    code: 200,
    type: "success",
    isShow: false,
  });

  const showNotification = (data: NotificationDataType) => {
    const { message, code, type, isShow } = data;
    setNotification({ message, code, type, isShow: true });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isShow: false }));
    }, 3000);
  };

  return (
    <NotifiContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotifiContext.Provider>
  );
};

export const useNotifi = () => {
  const context = useContext(NotifiContext);
  if (!context) {
    throw new Error("useNotifi must be used within an AuthProvider");
  }
  return context;
};
