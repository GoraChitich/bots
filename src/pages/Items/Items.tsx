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

const Items: React.FC = () => {
  const { accounts } = useContext(AccountsContext);
  const [options, setOptions] = useState<{title: string}[]>([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const getItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/allItems`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

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
          />
        </SearchWrapper>
      </Header>
      <ItemsTable
        items={items}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        getItems={getItems}
      />
    </Container>
  );
};

export default Items;
