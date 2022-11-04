import { FC, useEffect, useState, memo } from 'react';
import { Box } from '@mui/material';

import { useMode } from '../redux/hooks';
import { TodoItem } from './TodoItem';

type Props = {
  data: TodoItemType[];
};

const TodoList: FC<Props> = memo(({
  data
}) => {
  
  const mode: ModeType = useMode();

  const [modList, setModList] = useState(data);

  useEffect(() => {
    const modifiedList = data.filter((todo) => {
      switch (mode as ModeType) {
        case 'All':
          return todo;
        case 'Active':
          return !todo.checked;
        case 'Completed':
          return todo.checked;
      }
    });
    setModList(modifiedList);
  }, [mode, data]);

  return (
    <Box display='flex' flexDirection='column' gap='20px'>
      {modList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
          />
        );
      })}
    </Box>
  );
});

export { TodoList };