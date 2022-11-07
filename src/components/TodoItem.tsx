import { FC, useState, ChangeEvent, memo } from 'react';
import { IconButton, Paper, TextField } from '@mui/material';
import { RadioButtonUnchecked, TaskAlt, Delete, ModeEdit } from '@mui/icons-material';

import { useMyDispatch } from '../redux/hooks';
import { changeTodo, deleteTodo } from '../redux/todoThunk';

type Props = {
  id: number,
  checked: boolean,
  text: string
}

const TodoItem: FC<Props> = memo(({
  id,
  checked,
  text
}) => {
  const dispatch = useMyDispatch();
  
  const [ifReadOnly, setIfReadOnly] = useState(true);

  const [inputText, setInputText] = useState(text);

  const onEditHandler = () => {
    if (ifReadOnly) {
      setIfReadOnly(false);
    } else {
      setIfReadOnly(true);
      const newData = {
        id,
        checked,
        text: inputText,
      };
      dispatch(changeTodo(newData));
    }
  }

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (ifReadOnly) return;
    const { value } = e.target;
    setInputText(value);
  };

  const onCompleteHandler = () => {
    if (!ifReadOnly) return;
    const ifChecked = !checked;
    const newData = {
      id,
      checked: ifChecked,
      text,
    };
    dispatch(changeTodo(newData));
  }

  const onDeleteHandler = () => {
    dispatch(deleteTodo([id]))
  }

  return (
    <Paper
      elevation={2}
      sx={{
        width: '94%',
        p: '3%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {checked ? (
        <TaskAlt
          fontSize='large'
          onClick={onCompleteHandler}
          sx={{
            color: '#00000042',
          }}
        />
      ) : (
        <RadioButtonUnchecked
          fontSize='large'
          color={ifReadOnly ? 'error' : 'disabled'}
          onClick={onCompleteHandler}
        />
      )}
      <TextField
        variant={ifReadOnly ? 'standard' : 'outlined'}
        aria-label='todoItem'
        value={inputText}
        onChange={onChangeHandler}
        sx={{
          width: '75%',
          textDecoration: checked ? 'line-through' : 'none',
          color: checked ? '#00000042' : 'currentColor',
          '&:before': {
            borderBottom: 'none',
          },
          '&:after': {
            borderBottom: 'none',
          },
        }}
      />
      <IconButton
        aria-label='changeBtn'
        color={ifReadOnly ? 'default' : 'primary'}
        disabled={checked}
        onClick={onEditHandler}
        sx={{
          width: '60px',
        }}
      >
        <ModeEdit fontSize='large' />
      </IconButton>
      {ifReadOnly && (
        <IconButton
          aria-label='deleteBtn'
          color='default'
          sx={{
            width: '60px',
            '&:hover': {
              color: 'red',
            },
          }}
          onClick={onDeleteHandler}
        >
          <Delete fontSize='large' />
        </IconButton>
      )}
    </Paper>
  );
})

export { TodoItem };