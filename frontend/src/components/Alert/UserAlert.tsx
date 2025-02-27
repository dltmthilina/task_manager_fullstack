import { Alert, AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

import { useNotifi } from "../../context/NotifiContext";

const UserAlert = () => {
  const { notification } = useNotifi();

  /* function getSeverityByStatusCode(
    statusCode: number
  ): OverridableStringUnion<AlertColor, AlertPropsColorOverrides> {
    switch (true) {
      case statusCode >= 200 && statusCode < 300:
        return "success"; // Success
      case statusCode >= 400 && statusCode < 500:
        return "error"; // Client Error
      case statusCode >= 500 && statusCode < 600:
        return "error"; // Server Error
      case statusCode >= 100 && statusCode < 200:
        return "info"; // Informational
      case statusCode >= 300 && statusCode < 400:
        return "warning"; // Warning (Redirection)
      default:
        return "success";
    }
  } */

  return (
    <Alert
      className="absolute right-0 top-0 min-h-10 min-w-72"
      severity={notification.type}
    >
      <p className="text-xl font-medium ">{notification.message}</p>
    </Alert>
  );
};

export default UserAlert;
