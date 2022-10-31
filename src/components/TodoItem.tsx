import { FC, useState, ChangeEvent } from 'react';

import { IconButton, Input, OutlinedInput, Paper } from '@mui/material';
import { RadioButtonUnchecked, TaskAlt, Delete, ModeEdit } from '@mui/icons-material';

type Props = {
  id: number,
  checked: boolean,
  text: string,
  onTextChange: (data: Omit<TodoItemType, 'checked'>) => void;
  onCompletedChange: (data: Omit<TodoItemType, 'text'>) => void;
  onDelete: (id: TodoItemType['id']) => void;
}

const TodoItem: FC<Props> = ({
  id,
  checked,
  text,
  onTextChange,
  onCompletedChange,
  onDelete
}) => {
  const [ifReadOnly, setIfReadOnly] = useState(true);

  const onEditHandler = () => {
    setIfReadOnly((prevValue) => !prevValue);
  }

  const onDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    onTextChange({
      id, 
      text: value
    });
  };

  const onCompleteChange = () => {
    if (!ifReadOnly) return;
    onCompletedChange({
      id, 
      checked: !checked
    });
  }

  const onDeleteHandler = () => {
    onDelete(id);
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
          onClick={onCompleteChange}
          sx={{
            color: '#00000042',
          }}
        />
      ) : (
        <RadioButtonUnchecked
          fontSize='large'
          color={ifReadOnly ? 'error' : 'disabled'}
          onClick={onCompleteChange}
        />
      )}
      {ifReadOnly ? (
        <Input
          multiline
          readOnly={ifReadOnly}
          value={text}
          onClick={onCompleteChange}
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
      ) : (
        <OutlinedInput
          multiline
          readOnly={false}
          value={text}
          onChange={onDescriptionChange}
          sx={{
            width: 'calc(75% + 60px)',
          }}
        />
      )}
      <IconButton
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
}

export { TodoItem };