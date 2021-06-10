import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    left: 0,
    top: '58px',
    zIndex: 1,
  },
  formControl: {
    height: '48px',
    background: 'rgba(222, 226, 230, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '13px 20px',
    '&:nth-child(2)': {
      border: '1px solid rgba(197, 200, 204, 1)',
    },
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  formControlLabel: {
    minWidth: '100px',
    margin: 0,
    '& .MuiTypography-root': {
      color: 'rgba(33, 37, 41, 1)',
      fontSize: '12px',
    },
    '& .MuiButtonBase-root': {
      padding: '3px',
    },
  },
  checkbox: {
    '& .MuiSvgIcon-root': {
      width: '18px',
      height: '18px',
    },
    '&.Mui-checked': {
      '& .MuiSvgIcon-root': {
        color: 'rgba(0, 123, 255, 1)',
      },
    },
  },
});

const FormLabel = styled.p`
  width: 80px;
  color: rgba(33, 37, 41, 1);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

const calculateItem = (items: any, field: string, value: string) => {
  let count = 0;
  // eslint-disable-next-line
  for (let i = 0; i < items.length; i++) {
    // eslint-disable-next-line
    if (items[i][field] === value && items[i][field] !== undefined) {
      count += 1;
    }
  }

  return count;
};

const Filters: React.FC<any> = ({ items, setFilteredItems, fetchItems }) => {
  const classes = useStyles();
  const [allPlace, setAllPlace] = useState(true);
  const [allStatus, setAllStatus] = useState(true);
  const [allHold, setAllHold] = useState(true);
  const [place, setPlace] = useState({
    drive: false,
    badname: false,
    notdetermined: false,
  });
  const [status, setStatus] = useState({
    new: false,
    partly: false,
    wait: false,
    ready: false,
    offered: false,
    send: false,
    sent: false,
    selled: false,
    notatsteam: false,
  });
  const [hold, setHold] = useState({
    notathold: false,
    hold: false,
  });

  const handlerChangeAll = () => {
    if (place.badname || place.drive || place.notdetermined) {
      setAllPlace(false);
    } else {
      setAllPlace(!allPlace);
      fetchItems();
    }
  };

  const handlerStatusChange = () => {
    if (
      status.new
      || status.notatsteam
      || status.offered
      || status.partly
      || status.ready
      || status.selled
      || status.send
      || status.sent
      || status.wait
    ) {
      setAllStatus(false);
    } else {
      setAllStatus(!allStatus);
      fetchItems();
    }
  };

  const handlerHoldChange = () => {
    if (hold.hold || hold.notathold) {
      setAllHold(false);
    } else {
      setAllHold(!allHold);
      fetchItems();
    }
  };

  const handlerChangePlace = (event: any) => {
    setAllPlace(false);
    setPlace({ ...place, [event.target.name]: event.target.checked });
    setFilteredItems(items.filter((item: any) => item.place === event.target.name));
  };

  const handlerChangeStatus = (event: any) => {
    setAllStatus(false);
    setStatus({ ...status, [event.target.name]: event.target.checked });
    setFilteredItems(items.filter((item: any) => item.status === event.target.name));
  };

  const handlerChangeHold = (event: any) => {
    setAllStatus(false);
    setHold({ ...hold, [event.target.name]: event.target.checked });
    setFilteredItems(items.filter((item: any) => item.hold === event.target.name));
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel>Place:</FormLabel>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            className={classes.formControlLabel}
            value={`All(${items.length})`}
            control={(
              <Checkbox
                checked={allPlace}
                color="primary"
                name="all"
                className={classes.checkbox}
                onChange={handlerChangeAll}
              />
              )}
            label={`All(${items.length})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Drive(${calculateItem(items, 'place', 'drive')})`}
            control={(
              <Checkbox
                checked={place.drive}
                color="primary"
                name="drive"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
              )}
            label={`Google(${calculateItem(items, 'place', 'drive')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`BadName(${calculateItem(items, 'place', 'badName')})`}
            control={(
              <Checkbox
                checked={place.badname}
                color="primary"
                name="badname"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
              )}
            label={`BadName(${calculateItem(items, 'place', 'badName')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Not determined(${calculateItem(items, 'place', 'notdetermined')})`}
            control={(
              <Checkbox
                checked={place.notdetermined}
                color="primary"
                name="notdetermined"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
              )}
            label={`Not determined(${calculateItem(items, 'place', 'notdetermined')})`}
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel>Status:</FormLabel>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            className={classes.formControlLabel}
            value={`All(${items.length})`}
            control={(
              <Checkbox
                checked={allStatus}
                color="primary"
                name="all"
                className={classes.checkbox}
                onChange={handlerStatusChange}
              />
            )}
            label={`All(${items.length})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`New(${calculateItem(items, 'status', 'new')})`}
            control={(
              <Checkbox
                checked={status.new}
                color="primary"
                name="new"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`New(${calculateItem(items, 'status', 'new')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Partly(${calculateItem(items, 'status', 'partly')})`}
            control={(
              <Checkbox
                checked={status.partly}
                color="primary"
                name="partly"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Partly(${calculateItem(items, 'status', 'partly')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Wait(${calculateItem(items, 'status', 'wait')})`}
            control={(
              <Checkbox
                checked={status.wait}
                color="primary"
                name="wait"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Wait(${calculateItem(items, 'status', 'wait')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Ready(${calculateItem(items, 'status', 'ready')})`}
            control={(
              <Checkbox
                checked={status.ready}
                color="primary"
                name="ready"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Ready(${calculateItem(items, 'status', 'ready')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Offered(${calculateItem(items, 'status', 'offered')})`}
            control={(
              <Checkbox
                checked={status.offered}
                color="primary"
                name="offered"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Offered(${calculateItem(items, 'status', 'offered')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Send(${calculateItem(items, 'status', 'send')})`}
            control={(
              <Checkbox
                checked={status.send}
                color="primary"
                name="send"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Send(${calculateItem(items, 'status', 'send')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Send(${calculateItem(items, 'status', 'sent')})`}
            control={(
              <Checkbox
                checked={status.sent}
                color="primary"
                name="sent"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Send(${calculateItem(items, 'status', 'sent')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Selled(${calculateItem(items, 'status', 'selled')})`}
            control={(
              <Checkbox
                checked={status.selled}
                color="primary"
                name="selled"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`Selled(${calculateItem(items, 'status', 'selled')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`NotAtSteamInv(${calculateItem(items, 'status', 'notatsteam')})`}
            control={(
              <Checkbox
                checked={status.notatsteam}
                color="primary"
                name="notatsteam"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
              )}
            label={`NotAtSteamInv(${calculateItem(items, 'status', 'notatsteam')})`}
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel>Hold:</FormLabel>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            className={classes.formControlLabel}
            value={`All(${items.length})`}
            control={(
              <Checkbox
                checked={allHold}
                color="primary"
                name="all"
                className={classes.checkbox}
                onChange={handlerHoldChange}
              />
            )}
            label={`All(${items.length})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`NotAtHold(${calculateItem(items, 'hold', 'notathold')})`}
            control={(
              <Checkbox
                checked={hold.notathold}
                color="primary"
                name="notathold"
                className={classes.checkbox}
                onChange={handlerChangeHold}
              />
            )}
            label={`NotAtHold(${calculateItem(items, 'hold', 'notathold')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Hold(${calculateItem(items, 'hold', 'hold')})`}
            control={(
              <Checkbox
                checked={hold.hold}
                color="primary"
                name="hold"
                className={classes.checkbox}
                onChange={handlerChangeHold}
              />
            )}
            label={`Hold(${calculateItem(items, 'hold', 'hold')})`}
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
