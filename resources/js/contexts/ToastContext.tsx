import React, {useState} from 'react';

const ToastContext = React.createContext({
  toasts: [],
  setToasts: (toasts) => {
  }
});

const ToastContextProvider = ({children}) => {
  const [toasts, setToasts] = useState([]);
  return (
    <ToastContext.Provider value={{
      toasts: toasts,
      setToasts: setToasts
    }}>
      {children}
    </ToastContext.Provider>
  );
}

export {ToastContext, ToastContextProvider};
