import React, { useEffect, useContext, useState } from 'react';
// Components
import { Container } from 'components/Ui/Container';
import LogsTable from 'components/LogsTable';
import BotSearch from 'components/Ui/BotSearch';
// Styles
import {
  Header,
  HeaderTitle,
  SearchWrapper,
  HeaderSubtitle,
} from './styles';
// Context
import { AccountsContext } from 'context/accounts';

const Logs: React.FC = () => {
  const { accounts } = useContext(AccountsContext);
  const [options, setOptions] = useState<{title: string}[]>([]);

  useEffect(() => {
    const optionsArray = accounts.map((item: any) => ({ title: item.login }));
    setOptions(optionsArray);
  }, [accounts]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Logs
        </HeaderTitle>
        <SearchWrapper>
          <HeaderSubtitle>
            Bot search:
          </HeaderSubtitle>
          <BotSearch options={options} />
        </SearchWrapper>
      </Header>
      <LogsTable />
    </Container>
  );
};

export default Logs;
