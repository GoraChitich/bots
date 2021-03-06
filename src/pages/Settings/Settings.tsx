import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'components/Ui/Container';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
// Styles
import {
  useStyles,
  Header,
  HeaderTitle,
  Content,
  ProfitWrapper,
  Label,
  ApiWrapper,
} from './styles';
import { useHistory } from 'react-router-dom';

const Settings: React.FC = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    maxProfit: 0,
    minProfit: 0,
    steamApiKey: '',
    ping: 60,
    test: 60,
    getMoney: 60,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const history = useHistory();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const getSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setFormData({
        maxProfit: data.maxProfit,
        minProfit: data.minProfit,
        steamApiKey: data.steamApiKey || '',
        ping: data.ping || 60,
        test: data.test || 60,
        getMoney: data.getMoney || 60,
      });
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        localStorage.setItem('token', 'null');
        history.push('/login');
      } else {
        console.log(error);
      }
      console.log(error);
    }
  };

  const setSettings = async () => {
    setSuccessMsg(false);
    setErrorMsg(false);
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/edit/settings`,
        JSON.stringify({
          maxProfit: Number(formData.maxProfit),
          minProfit: Number(formData.minProfit),
          steamApiKey: formData.steamApiKey,
          ping: Number(formData.ping),
          test: Number(formData.test),
          getMoney: Number(formData.getMoney),
        }),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      if (data) {
        setSuccessMsg(true);
      }
    } catch (error) {
      if (error) {
        setErrorMsg(true);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Settings
        </HeaderTitle>
      </Header>
      <Content>
        <ProfitWrapper>
          <Label htmlFor="min">
            ?????? ????????????, %
          </Label>
          <TextField
            id="min"
            name="minProfit"
            className={classes.textField}
            variant="outlined"
            value={formData.minProfit}
            onChange={changeHandler}
            type="tel"
          />
          <Label htmlFor="max">
            ???????? ????????????, %
          </Label>
          <TextField
            id="max"
            name="maxProfit"
            className={classes.textField}
            variant="outlined"
            value={formData.maxProfit}
            onChange={changeHandler}
            type="tel"
          />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setSettings()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : '??????????????????'}
          </Button>
        </ProfitWrapper>
        <ApiWrapper>
          <Label htmlFor="key">
            Steamapis api key:
          </Label>
          <TextField
            id="key"
            name="steamApiKey"
            className={classes.textField}
            variant="outlined"
            value={formData.steamApiKey}
            onChange={changeHandler}
          />
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setSettings()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : '??????????????????'}
          </Button>
        </ApiWrapper>
        <ApiWrapper>
          <Label htmlFor="ping">
            Ping:
          </Label>
          <TextField
            id="ping"
            name="ping"
            className={classes.textFieldSmall}
            variant="outlined"
            value={formData.ping}
            onChange={changeHandler}
            type="tel"
          />
          <Label className={classes.sec}>
            sec
          </Label>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setSettings()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : '??????????????????'}
          </Button>
        </ApiWrapper>
        <ApiWrapper>
          <Label htmlFor="test">
            Test:
          </Label>
          <TextField
            id="test"
            name="test"
            className={classes.textFieldSmall}
            variant="outlined"
            value={formData.test}
            onChange={changeHandler}
            type="tel"
          />
          <Label className={classes.sec}>
            sec
          </Label>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setSettings()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : '??????????????????'}
          </Button>
        </ApiWrapper>
        <ApiWrapper>
          <Label htmlFor="money">
            Get-money:
          </Label>
          <TextField
            id="money"
            name="getMoney"
            className={classes.textFieldSmall}
            variant="outlined"
            value={formData.getMoney}
            onChange={changeHandler}
            type="tel"
          />
          <Label className={classes.sec}>
            sec
          </Label>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            onClick={() => setSettings()}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : '??????????????????'}
          </Button>
        </ApiWrapper>
        {successMsg && (<Alert severity="success">?????????????? ??????????????????</Alert>)}
        {errorMsg && (<Alert severity="error">????????????, ???????????????????? ?????? ??????</Alert>)}
      </Content>
    </Container>
  );
};

export default Settings;
