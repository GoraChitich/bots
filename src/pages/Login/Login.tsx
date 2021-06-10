import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
// Styles
import {
  Wrapper,
  LoginForm,
  FormLabel,
  Label,
  Title,
  StyledTextField,
  StyledButton,
} from './styles';

const Login: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{username: string, password: string}>({
    username: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/login`, JSON.stringify({
        username: formData.username,
        password: formData.password,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data) {
        localStorage.setItem('token', data.access_token);
        history.push('/accounts');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.statusCode === 401) {
          setErrorMsg('Wrong password or Username');
        }
        // eslint-disable-next-line
        console.log(error.response);
      } else {
        // eslint-disable-next-line
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handlerSubmit}>
        <FormLabel>
          Авторизация
        </FormLabel>
        <Label htmlFor="username">
          <Title>
            Логин:
          </Title>
          <StyledTextField
            error={!!errorMsg}
            id="username"
            name="username"
            variant="outlined"
            placeholder="Login"
            required
            onChange={handlerInput}
          />
        </Label>
        <Label htmlFor="password">
          <Title>
            Пароль:
          </Title>
          <StyledTextField
            error={!!errorMsg}
            id="password"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Password"
            required
            helperText={errorMsg}
            onChange={handlerInput}
          />
        </Label>
        <StyledButton
          disabled={loading}
          variant="contained"
          color="primary"
          type="submit"
        >
          {loading ? <CircularProgress /> : 'Войти'}
        </StyledButton>
      </LoginForm>
    </Wrapper>
  );
};

export default Login;
