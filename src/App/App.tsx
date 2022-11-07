import { useEffect, memo, useCallback, useMemo } from 'react';

import { useMyDispatch, useMyList } from '../redux/hooks';
import { getTodos, deleteTodo } from '../redux/todoThunk';
import { Footer, Header, Panel, TodoList } from '../components';
import './App.css';

const App = memo(() => {
  const dispatch = useMyDispatch();

  const data: TodoItemType[] = useMyList();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const newItemId = useMemo(() => {
    return data.length > 0 ? data[data.length - 1].id + 1 : 1;
  }, [data]);

  const onDeleteCompletedHandler = useCallback(() => {
    const completedList: TodoItemType[] = data.filter((todo) => todo.checked);
    if (completedList.length < 1) return;
    const completedIds: TodoItemType['id'][] = completedList.map((todo) => todo.id);
    dispatch(deleteTodo(completedIds));
  }, []);

  return (
    <div className='App'>
      <Header />
      <Panel lastDataId={newItemId} />
      <TodoList data={data} />
      <Footer onDeleteCompleted={onDeleteCompletedHandler} />
    </div>
  );
});

export default App;
































