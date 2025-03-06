import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setIsDeleting: (value: boolean) => void;
  confirmDelete: () => void;
}

const ConfirmBox = ({ open, setOpen, confirmDelete }: ConfirmProps) => {
  const handleOk = () => {
    setOpen(false);
    confirmDelete();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>Are you sure you want to delete this item</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmBox;
