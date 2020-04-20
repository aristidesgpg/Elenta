import * as React from "react";
import {useContext} from "react";
import {ToastContext} from "../../../contexts/ToastContext";
import Toast from "react-bootstrap/Toast";

export const ElentaToastContainer = () => {
  const toastContext = useContext(ToastContext);
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        marginRight: "20px",
        width: "250px",
        right: 0,
        zIndex: 999
      }}
    >
      {
        toastContext.toasts
      }
    </div>
  );
};

export default ElentaToastContainer;
