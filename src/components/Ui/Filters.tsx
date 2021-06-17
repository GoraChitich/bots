import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';
import { filterNames } from './FilterNames';

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
  formLabelFirst: {
    width: '280px',
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
    // @ts-ignore
    if (items[i][field] === filterNames[String(value)] && items[i][field] !== undefined) {
      count += 1;
    }
  }

  return count;
};

const Filters: React.FC<any> = ({
  items, setFilteredItems, filteredItems, fetchItems, filter, setFilter,
}) => {
  const classes = useStyles();
  const [allPlace, setAllPlace] = useState(true);
  const [allStatus, setAllStatus] = useState(true);
  const [allHold, setAllHold] = useState(true);
  const [place, setPlace] = useState({
    google: false,
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
    needtosend: false,
    sent: false,
    selled: false,
    notatsteam: false,
  });
  const [hold, setHold] = useState({
    notathold: false,
    hold: false,
  });

  const changeFiter = (folder: string, part: string, value: boolean) => {
    const _filter = { ...filter };
    if (_filter[folder] === undefined) {
      _filter[folder] = {};
    }
    if (part === 'all' && value === true) {
      _filter[folder] = {};
      _filter[folder][part] = value;
    }
    _filter[folder][part] = value;
    setFilter(_filter);
    console.log(_filter);
  };

  const handlerChangeAll = () => {
    // if (place.badname || place.drive || place.notdetermined) {
    //   changeFiter('place', 'all', false);
    //   setAllPlace(false);
    // } else {
    const newAll = !filter.place.all;
    if (newAll) {
      place.badname = false;
      place.google = false;
      place.notdetermined = false;
    }
    changeFiter('place', 'all', newAll);
    setAllPlace(!allPlace);
    fetchItems();
    // }
  };

  const handlerStatusChange = () => {
    // if (
    //   status.new
    //   || status.notatsteam
    //   || status.offered
    //   || status.partly
    //   || status.ready
    //   || status.selled
    //   || status.needtosend
    //   || status.send
    //   || status.sent
    //   || status.wait
    // ) {
    //   changeFiter('status', 'all', false);
    //   changeFiter('status', 'all', false);
    //   setAllStatus(false);
    // } else {
    const newAll = !filter.status.all;
    if (newAll) {
      status.new = false;
      status.notatsteam = false;
      status.offered = false;
      status.partly = false;
      status.ready = false;
      status.selled = false;
      status.needtosend = false;
      status.send = false;
      status.sent = false;
      status.wait = false;
    }
    changeFiter('status', 'all', newAll);
    setAllStatus(newAll);
    fetchItems();
    // }
  };

  const handlerHoldChange = () => {
    // if (hold.hold || hold.notathold) {
    //   changeFiter('hold', 'all', false);
    //   setAllHold(false);
    // } else {
    const newAll = !filter.hold.all;
    if (newAll) {
      hold.hold = false;
      hold.notathold = false;
    }
    changeFiter('hold', 'all', newAll);
    setAllHold(newAll);
    fetchItems();
    // }
  };

  const handlerChangePlace = (event: any) => {
    setAllPlace(false);
    changeFiter('place', 'all', false);

    setPlace({ ...place, [event.target.name]: event.target.checked });
    changeFiter('place', event.target.name, event.target.checked);

    // @ts-ignore
    // setFilteredItems(items.filter((item: any) => item.place === filterNames[event.target.name]));
  };

  const handlerChangeStatus = (event: any) => {
    setAllStatus(false);
    changeFiter('status', 'all', false);
    changeFiter('status', event.target.name, event.target.checked);

    setStatus({ ...status, [event.target.name]: event.target.checked });
    // @ts-ignore
    // eslint-disable-next-line max-len
    // setFilteredItems(items.filter((item: any) => item.status === filterNames[event.target.name]));
  };

  const handlerChangeHold = (event: any) => {
    setAllHold(false);
    changeFiter('hold', 'all', false);
    changeFiter('hold', event.target.name, event.target.checked);

    setHold({ ...hold, [event.target.name]: event.target.checked });
    // @ts-ignore
    // setFilteredItems(items.filter((item: any) => item.hold === filterNames[event.target.name]));
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.formLabelFirst}>Total: {items.length}</FormLabel>
        {/* <FormGroup className={classes.formGroup}>
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
        </FormGroup> */}
      </FormControl>

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
            label="All"
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Google(${calculateItem(filteredItems, 'place', 'google')})`}
            control={(
              <Checkbox
                checked={place.google}
                color="primary"
                name="google"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
            )}
            label={`Google(${calculateItem(filteredItems, 'place', 'google')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`BadName(${calculateItem(filteredItems, 'place', 'badName')})`}
            control={(
              <Checkbox
                checked={place.badname}
                color="primary"
                name="badname"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
            )}
            label={`BadName(${calculateItem(filteredItems, 'place', 'badname')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`notdetermined(${calculateItem(filteredItems, 'place', 'notdetermined')})`}
            control={(
              <Checkbox
                checked={place.notdetermined}
                color="primary"
                name="notdetermined"
                className={classes.checkbox}
                onChange={handlerChangePlace}
              />
            )}
            label={`Not determined(${calculateItem(filteredItems, 'place', 'notdetermined')})`}
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
            label="All"
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`New(${calculateItem(filteredItems, 'status', 'new')})`}
            control={(
              <Checkbox
                checked={status.new}
                color="primary"
                name="new"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`New(${calculateItem(filteredItems, 'status', 'new')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Partly(${calculateItem(filteredItems, 'status', 'partly')})`}
            control={(
              <Checkbox
                checked={status.partly}
                color="primary"
                name="partly"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Partly(${calculateItem(filteredItems, 'status', 'partly')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Wait(${calculateItem(filteredItems, 'status', 'wait')})`}
            control={(
              <Checkbox
                checked={status.wait}
                color="primary"
                name="wait"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Wait(${calculateItem(filteredItems, 'status', 'wait')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Ready(${calculateItem(filteredItems, 'status', 'ready')})`}
            control={(
              <Checkbox
                checked={status.ready}
                color="primary"
                name="ready"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Ready(${calculateItem(filteredItems, 'status', 'ready')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Offered(${calculateItem(filteredItems, 'status', 'offered')})`}
            control={(
              <Checkbox
                checked={status.offered}
                color="primary"
                name="offered"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Offered(${calculateItem(filteredItems, 'status', 'offered')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Send(${calculateItem(filteredItems, 'status', 'needtosend')})`}
            control={(
              <Checkbox
                checked={status.needtosend}
                color="primary"
                name="needtosend"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Need to send(${calculateItem(filteredItems, 'status', 'needtosend')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Sent(${calculateItem(filteredItems, 'status', 'sent')})`}
            control={(
              <Checkbox
                checked={status.sent}
                color="primary"
                name="sent"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Sent(${calculateItem(filteredItems, 'status', 'sent')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Selled(${calculateItem(filteredItems, 'status', 'selled')})`}
            control={(
              <Checkbox
                checked={status.selled}
                color="primary"
                name="selled"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`Selled(${calculateItem(filteredItems, 'status', 'selled')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`NotAtSteamInv(${calculateItem(filteredItems, 'status', 'notatinventory')})`}
            control={(
              <Checkbox
                checked={status.notatsteam}
                color="primary"
                name="notatsteam"
                className={classes.checkbox}
                onChange={handlerChangeStatus}
              />
            )}
            label={`NotAtSteamInv(${calculateItem(filteredItems, 'status', 'notatinventory')})`}
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
            label="All"
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`NotAtHold(${calculateItem(filteredItems, 'hold', 'notathold')})`}
            control={(
              <Checkbox
                checked={hold.notathold}
                color="primary"
                name="notathold"
                className={classes.checkbox}
                onChange={handlerChangeHold}
              />
            )}
            label={`NotAtHold(${calculateItem(filteredItems, 'hold', 'notathold')})`}
            labelPlacement="end"
          />
          <FormControlLabel
            className={classes.formControlLabel}
            value={`Hold(${calculateItem(filteredItems, 'hold', 'hold')})`}
            control={(
              <Checkbox
                checked={hold.hold}
                color="primary"
                name="hold"
                className={classes.checkbox}
                onChange={handlerChangeHold}
              />
            )}
            label={`Hold(${calculateItem(filteredItems, 'hold', 'hold')})`}
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
