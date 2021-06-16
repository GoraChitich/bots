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
      console.log(error);
    }
  };

  useEffect(() => {
    if (newData.length) {
      // setNewData([]);
    }
    // setCounter(counter + 1);
    console.log(newData);
    const _newData = [...newData];
    // setCounter(counter + 1);
    // if (counter % 2 === 0) {
    //   _newData.shift();
    // }
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
        _items = _items.filter((item: any) => arrFind.includes(item[kFilter]));
      }
    }
    setFilteredItems(_items);
  }, [filter]);

  useEffect(() => {
    getItems();
    const interval = setInterval(getItems, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const optionsArray = accounts.map((item: any) => ({ title: item.login, value: item.login }));
    setOptions(optionsArray);
  }, [accounts]);

  useEffect(() => {
    const _filteredItems = [...filteredItems];
    for (const k in sort) {
      // @ts-ignore
      _filteredItems.sort((a, b) => (sort[k] === 'asc' ? a[k] - b[k] : b[k] - a[k]));
      setFilteredItems(_filteredItems);
    }
  }, [sort]);

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
      />
    </Container>
  );
};

export default Items;
