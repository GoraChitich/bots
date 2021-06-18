import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// Components
import ItemsTable from 'components/ItemsTable';
import BotSearch from 'components/Ui/BotSearch';
// Styles
import {
  Container,
  Header,
  HeaderTitle,
  SearchWrapper,
  HeaderSubtitle,
  CourseWrapper,
  CourseInfo,
} from './styles';
// Context
import { AccountsContext } from 'context/accounts';
import mockup from './mockup.json';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';

const Items: React.FC = () => {
  const { accounts } = useContext(AccountsContext);
  const [options, setOptions] = useState<{ title: string }[]>([]);
  const [items, setItems] = useState([]);
  const [newData, setNewData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // eslint-disable-next-line max-len
  const [filter, setFilter] = useState({ place: { all: true }, hold: { all: true }, status: { all: true } });
  const [sort, setSort] = useState({});
  const [counter, setCounter] = useState(0);
  const [accountSeller, setAccountSeller] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchString, setSearchString] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    getItems();
    const interval = setInterval(getItems, 10000);
    return () => clearInterval(interval);
  }, []);

  // comparing two array: new and old
  const compareArrays = (arr1: any, arr2: any): boolean => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i += 1) {
      const obj1 = arr1[i];
      const obj2 = arr2[i];
      for (const key in obj1) {
        if (obj1[key] !== obj2[key]) return false;
      }
    }
    return true;
  };

  const getItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/allItems`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setNewData(data);
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        localStorage.setItem('token', 'null');
        history.push('/login');
      } else {
        console.log(error);
      }
    }

    // const data = mockup;
    // // @ts-ignore
    // setNewData(data);
  };

  useEffect(() => {
    if (newData.length) {
      // setNewData([]);
    }
    // setCounter(counter + 1);
    console.log(newData);
    const _newData = [...newData];
    setCounter(counter + 1);
    // console.log(_newData.length);
    if (!compareArrays(_newData, items)) {
      setItems(_newData);
      setFilteredItems(_newData);
    } else {
      console.log('====');
    }
  }, [newData]);

  useEffect(() => {
    let _items = [...items];
    console.log(filter);
    for (const kFilter in filter) {
      // @ts-ignore
      if (filter[kFilter].all === true) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const arrFind: any = [];
      // @ts-ignore
      for (const kItem in filter[kFilter]) {
        if (kItem === 'all') {
          // eslint-disable-next-line no-continue
          continue;
        }
        // @ts-ignore
        if (filter[kFilter][kItem] === true) {
          // @ts-ignore
          arrFind.push(kItem);
        }
      }
      if (arrFind.length) {
        if (arrFind.includes('hold') || arrFind.includes('notathold') || arrFind.includes('nodatehold')) {
          _items = _items.filter((item: any) => {
            if (arrFind.includes('hold') && dayjs(item.holdOff) >= dayjs()) return true;
            if (arrFind.includes('notathold') && dayjs(item.holdOff) < dayjs()) return true;
            if (arrFind.includes('nodatehold') && item.holdOff === null) return true;
            return false;
          });
          // _items = _items.filter((item: any) => {
          //     const arrCurrent = [];
          //     if(item[kFilter] >= new Date()) arrCurrent.push('hold');
          //     if(item[kFilter] < new Date()) arrCurrent.push('notathold');
          //     arrFind.includes(item[kFilter])}
          //   );
        } else {
          _items = _items.filter((item: any) => arrFind.includes(item[kFilter]));
        }
      }
    }
    if (accountSeller) {
      _items = _items.filter((item: any) => item.accountSeller === accountSeller);
    }

    if (dateRange[0] !== null && dateRange[1] !== null) {
      const [startDate, endDate] = dateRange;

      const from = dayjs(startDate || '').unix();
      const to = dayjs(endDate || '').unix();
      console.log(dateRange);
      _items = _items.filter((item: any) => {
        if (dayjs(item.createdDate).unix() >= from
          && dayjs(item.createdDate).unix() <= (to + 60 * 60 * 24)) {
          return true;
        }
        return false;
      });
    }

    if (searchString) {
      _items = _items.filter(
        (item: any) => (
          item.ruHashName && item.ruHashName.toUpperCase().indexOf(searchString.toUpperCase()) >= 0)
          || (item.hashName && item.hashName.toUpperCase().indexOf(searchString.toUpperCase()) >= 0)
          || (item.assetId && item.assetId.toUpperCase().indexOf(searchString.toUpperCase()) >= 0),
      );
    }

    for (const k in sort) {
      _items.sort((a, b) => {
        let a1: any = a[k];
        let b1: any = b[k];
        if (k === 'holdOff' || k === 'createdDate') {
          a1 = a1 ? dayjs(a1) : new Date(0, 0, 0);
          b1 = b1 ? dayjs(b1) : new Date(0, 0, 0);
        }
        // @ts-ignore
        return (sort[k] === 'asc' ? 1 : -1) * (a1 - b1);
      });
    }

    setFilteredItems(_items);
  }, [filter, accountSeller, dateRange, searchString, sort, items]);

  useEffect(() => {
    const optionsArray = accounts.map((item: any) => ({ title: item.login, value: item.login }));
    setOptions(optionsArray);
  }, [accounts]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Items
        </HeaderTitle>
        <CourseWrapper>
          <CourseInfo>
            Курс $: 76.820 ₽
          </CourseInfo>
          <CourseInfo>
            from: 22, 23:41
          </CourseInfo>
        </CourseWrapper>
        <SearchWrapper>
          <HeaderSubtitle>
            Bot search:
          </HeaderSubtitle>
          <BotSearch
            options={options}
            items={items}
            setItems={setItems}
            setFilteredItems={setFilteredItems}
            getItems={getItems}
            accountSeller={accountSeller}
            setAccountSeller={setAccountSeller}
          />
        </SearchWrapper>
      </Header>
      <ItemsTable
        items={items}
        filteredItems={filteredItems}
        filter={filter}
        setFilter={setFilter}
        setFilteredItems={setFilteredItems}
        getItems={getItems}
        sort={sort}
        setSort={setSort}
        dateRange={dateRange}
        setDateRange={setDateRange}
        searchString={searchString}
        setSearchString={setSearchString}
        accountSeller={accountSeller}
      />
    </Container>
  );
};

export default Items;
