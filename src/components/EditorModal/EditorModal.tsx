import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
// Styles
import {
  useStyles,
  Title,
  ModalBody,
  ModalBodyTitle,
  ModalBodySubtitle,
  ExampleText,
} from './styles';
// Components
import ConfirmModal from 'components/Ui/ConfirmModal';
import { useHistory } from 'react-router-dom';

interface Props {
  open: boolean
  setOpen: (arg0: boolean) => void
  bots: any[]
  setAccounts: (arg0: any) => void
}

const EditorModal: React.FC<Props> = (
  {
    open, setOpen, bots, setAccounts,
  },
) => {
  const classes = useStyles();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [botsString, setBotsString] = useState<string>('');
  const history = useHistory();

  const formatBots = () => {
    console.log(bots);
    const newBots = bots.map((bot: any) => ({
      comment: bot.comment,
      login: bot.login,
      password: bot.password,
      steam_id: bot.steam_id,
      shared_secret: bot.shared_secret,
      identity_secret: bot.identity_secret,
      indentity_secret: bot.indentity_secret,
      steam_api: bot.steam_api,
      tm_api: bot.tm_api || null,
      google_drive: bot.google_drive,
      proxy: bot.proxy,
    }));

    const string = newBots.reduce((acc: string, item: any) => (`${acc}${JSON.stringify(item)}\n\n`), '');

    setBotsString(string);
  };

  const sendBots = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/edit/batchAccounts`,
        botsString,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain',
          },
        });

      const result = await axios.get(`${process.env.REACT_APP_SERVER}/getSellerAccounts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAccounts(result.data);

      setOpenConfirm(false);
      setOpen(false);
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        localStorage.setItem('token', 'null');
        history.push('/login');
      } else {
        console.log(error);
      }
      console.log(error);
      console.log(error.response.data);
    } finally {
      setOpenConfirm(false);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpenConfirm(true);
  };

  useEffect(() => {
    formatBots();
  }, [bots]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.dialog}
    >
      <Title>
        Accounts editor
      </Title>
      <ModalBody>
        <ModalBodyTitle>
          Ввод данных:
        </ModalBodyTitle>
        <TextField
          className={classes.textArea}
          fullWidth
          variant="outlined"
          multiline
          rows={15}
          value={botsString}
          onChange={(event) => setBotsString(event.target.value)}
        />
        <ModalBodySubtitle>
          Пример ввода данных:
        </ModalBodySubtitle>
        <ExampleText>
          {/* eslint-disable-next-line */}
          {`{"comment":"null","login":"null","password":"null","steam_id":"null","shared_secret":"null","identity_secret":"null","steam_api":"null","tm_api":"null","google_drive":"null","proxy":"null"}`}
        </ExampleText>
      </ModalBody>
      <DialogActions>
        <Button
          className={classes.cancelBtn}
          onClick={handleClose}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          className={classes.saveBtn}
          onClick={handleConfirm}
          color="primary"
          autoFocus
          variant="contained"
        >
          Save Changes
        </Button>
      </DialogActions>
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenConfirm}
        setMainModal={setOpen}
        sendBots={sendBots}
      />
    </Dialog>
  );
};

export default EditorModal;
