import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface EditModalCompo {
  open: boolean;
  handleClose: () => void;
  selectedRange: { start: Date; end: Date } | null;
}

export const EditModal: React.FC<EditModalCompo> = ({
  open,
  handleClose,
  selectedRange,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Selected Date Range
        </Typography>
        {selectedRange && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            From: {selectedRange.start.toLocaleString()} <br />
            To: {selectedRange.end.toLocaleString()}
          </Typography>
        )}
        <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};
