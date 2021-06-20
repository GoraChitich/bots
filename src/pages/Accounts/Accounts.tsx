import React, { useState, useContext, useEffect } from 'react';
// Components
import { Container } from 'components/Ui/Container';
import AccountsTable from 'components/AccountsTable';
import EditorModal from 'components/EditorModal';
// Styles
import {
  Header,
  HeaderTitle,
  StyledButton,
} from './styles';
// context
import { AccountsContext } from 'context/accounts';

const Accounts: React.FC = () => {
  // @ts-ignore
  const { accounts, setAccounts } = useContext(AccountsContext);
  const [open, setOpen] = useState<boolean>(false);
  const [rows, setRows] = useState([]);

  const handlerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setRows(accounts);
  }, [accounts]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Accounts
        </HeaderTitle>
        <StyledButton
          type="button"
          variant="contained"
          color="primary"
          onClick={handlerOpen}
        >
          Accounts editor
        </StyledButton>
      </Header>
      <AccountsTable
        rows={rows}
      />
      <EditorModal
        open={open}
        setOpen={setOpen}
        bots={rows}
        setAccounts={setAccounts}
      />
    </Container>
  );
};

export default Accounts;
