import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean
  setOpen: (arg0: boolean) => void
  setMainModal: (arg: boolean) => void
  sendBots: any
}

const ConfirmModal: React.FC<Props> = ({
  open,
  setOpen,
  setMainModal,
  sendBots,
}) => {
  const handleClose = () => {
    setOpen(false);
    setMainModal(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Точно ли вы хотите внести изменения?
        </DialogTitle>
        <DialogActions>
          <Button onClick={sendBots} color="primary">
            Да
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
