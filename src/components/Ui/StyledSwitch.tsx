import React, { useState } from 'react';
import axios from 'axios';
import { Switch, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  switch: {
    '& .MuiSwitch-colorPrimary.Mui-checked': {
      color: 'rgba(0,123,255,1)',
    },
    '& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: 'rgba(0,123,255,0.5)',
    },
  },
});

const StyledSwitch: React.FC<{id: string, checked: boolean}> = ({ id, checked }) => {
  const classes = useStyles();
  const [enabled, setEnabled] = useState<boolean>(checked);

  const handleChange = async () => {
    setEnabled(!enabled);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_SERVER}/api/enableAccountById`,
        JSON.stringify({ id, enable: !enabled }),
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Switch
      className={classes.switch}
      checked={enabled}
      onChange={handleChange}
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  );
};

export default StyledSwitch;
