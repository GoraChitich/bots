import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  dialog: {
    '& .MuiPaper-root ': {
      maxWidth: '800px',
      width: '100%',
    },
  },
  textArea: {
    marginBottom: '8px',
    '& .MuiInputBase-input': {
      color: 'rgba(108, 117, 125, 1)',
      fontSize: '14px',
      lineHeight: '21px',
    },
  },
  cancelBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgba(108, 117, 125, 1)',
      textTransform: 'none',
      color: '#fff',
      lineHeight: '24px',
      fontSize: '1rem',
    },
  },
  saveBtn: {
    '&.MuiButtonBase-root': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
});

export const Title = styled.div`
  padding: 20px;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 24px;

  border-bottom: 1px solid rgba(222, 226, 230, 1);
`;

export const ModalBody = styled.div`
  padding: 16px;
  margin-bottom: 16px;

  border-bottom: 1px solid rgba(222, 226, 230, 1);
`;

export const ModalBodyTitle = styled.p`
  line-height: 24px;
  color: rgba(33, 37, 41, 1);

  margin-bottom: 8px;
`;

export const ModalBodySubtitle = styled.p`
  font-size: 13px;
  line-height: 19px;
  color: rgba(108, 117, 125, 1);
`;

export const ExampleText = styled(ModalBodySubtitle)`
  background: rgba(233, 247, 239, 1);
  padding: 8px 12px;

  word-wrap: break-word;
`;
