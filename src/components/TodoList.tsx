import { FC } from 'react';
import { Box } from '@mui/material';

import { TodoItem } from './TodoItem';

type Props = {
  todoList: TodoItemType[];
  currentMode: ModeType;
  onChange: (data: TodoItemType) => void;
  onDelete: (id: TodoItemType['id']) => void;
};

const TodoList: FC<Props> = ({
  todoList,
  currentMode,
  onChange,
  onDelete,
}) => {
  const modifiedList = todoList.filter(todo => {
    switch (currentMode) {
      case 'All': return todo;
      case 'Active': return !todo.checked;
      case 'Completed': return todo.checked;
    }
  })

  return (
    <Box display='flex' flexDirection='column' gap='20px'>
      {modifiedList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            onDelete={onDelete}
            onChange={onChange}
          />
        );
      })}
    </Box>
  );
};

export { TodoList };