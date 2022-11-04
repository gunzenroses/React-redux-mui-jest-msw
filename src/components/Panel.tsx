import { ChangeEvent, useState, FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

import { useMyDispatch } from '../redux/hooks';
import { addTodo } from '../redux/todoThunk';

type Props = {
  lastDataId: number;
}

const Panel: FC<Props> = memo(({ lastDataId }) => {
  const dispatch = useMyDispatch();

  const [value, setValue] = useState('');

  const onAddHandler = () => {
    const newItem = {
      id: lastDataId,
      checked: false,
      text: value,
    };
    dispatch(addTodo(newItem));
    setValue('');
  };

  const buttonDisability = value.length < 1 ? true : false;

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

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
        placeholder="What's need to be done?"
        variant='outlined'
        onChange={onChangeHandler}
        sx={{
          width: '80%',
        }}
      />
      <Button
        disabled={buttonDisability}
        variant='contained'
        aria-label='addButton'
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
});

export { Panel };