import { ChangeEvent, useState, FC } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

type Props = {
  onAdd: (text: string) => void;
}

const Panel: FC<Props> = ({ onAdd }) => {
  const [value, setValue ] = useState('');

  const buttonDisability = value.length < 1 ? true : false;

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const onAddHandler = () => {
    onAdd(value);
    setValue('');
  }

  return (
    <Box
      display='flex'
      flexDirection='row'
      sx={{
        width: '100%',
        minWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto',
        mb: '20px',
      }}
    >
      <TextField
        value={value}
        label="What's need to be done?"
        variant='outlined'
        onChange={onChangeHandler}
        sx={{
          width: '80%',
        }}
      />
      <Button
        disabled={buttonDisability}
        variant='contained'
        color='primary'
        size='medium'
        sx={{
          width: '20%',
        }}
        startIcon={<Add />}
        onClick={onAddHandler}
      >
        Add
      </Button>
    </Box>
  );
}

export { Panel };