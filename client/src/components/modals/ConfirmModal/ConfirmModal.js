import * as React from 'react';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmSubmitModal({ title, content, button, showConfirmModale, toggleShowConfirmModale, onClickConfirm, isLoading }) {

  const handleOnClose = () => !isLoading && toggleShowConfirmModale()

  return (
    <Dialog
      open={showConfirmModale}
      onClose={handleOnClose}
      TransitionComponent={Transition}
    >
      <DialogTitle id="modal-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color='warning'
          onClick={toggleShowConfirmModale}
        >
          Annuler
        </Button>
        {!isLoading ?
          <Button
            color='secondary'
            onClick={onClickConfirm}
            autoFocus
          >
            {button}
          </Button> :
          <CircularProgress color='secondary'
          />
        }
      </DialogActions>
    </Dialog>
  );
}
