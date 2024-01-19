import React, { useEffect } from "react";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div className="notification border border-black w-[400px] bg-green-100 absolute top-5 right-5 py-2 px-3 text-xl">
      {message}
    </div>
  );
};

export default Notification;
