import React, { createContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "default", // Add a default type
  });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type }); // Set both message and type
  };

  const hideToast = () => {
    setToast({ visible: false, message: "", type: "default" }); // Reset type
  };

  const value = {
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type} // Use toast.type
        visible={toast.visible}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);
