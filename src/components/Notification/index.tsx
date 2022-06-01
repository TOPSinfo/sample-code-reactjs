import { store as stores } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./notificaton.scss";
type MyUnionType = "success" | "danger" | "info" | "default" | "warning";

export const toaster = (
  message: string,
  type: MyUnionType,
  duration: number,
  title?: string
) => {
  return stores.addNotification({
    title,
    message,
    type,
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration,
      onScreen: true
    }
  });
};
