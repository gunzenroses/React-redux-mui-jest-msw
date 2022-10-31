import { FC } from 'react';
import { Box } from '@mui/material';

import { TodoItem } from './TodoItem';

type Props = {
  todoList: TodoItemType[];
  onTextChange: (data: Omit<TodoItemType, 'checked'>) => void;
  onCompletedChange: (data: Omit<TodoItemType, 'text'>) => void;
  onDelete: (id: TodoItemType['id']) => void;
};

const TodoList: FC<Props> = ({
  todoList,
  onTextChange,
  onCompletedChange,
  onDelete,
}) => {
  return (
    <Box display='flex' flexDirection='column' gap='20px'>
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            onDelete={onDelete}
            onTextChange={onTextChange}
            onCompletedChange={onCompletedChange}
          />
        );
      })}
    </Box>
  );
};

export { TodoList };