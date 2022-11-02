import { useEffect, useMemo, useState } from 'react';

import { useMyDispatch, useMyList } from '../redux/hooks';
import { getTodos, changeTodo, deleteTodo } from '../redux/todoThunk';
import { Footer, Header, Panel, TodoList } from '../components';
import './App.css';

function App() {
  const dispatch = useMyDispatch();

  const data: TodoItemType[] = useMyList();
  console.log(1, data)

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const onDeleteCompletedHandler = () => {
    const completedList = data.filter((todo) => todo.checked);
    if (completedList.length < 1) return;
    const completedIds: TodoItemType['id'][] = completedList.map((todo) => todo.id);
    dispatch(deleteTodo(completedIds));
  }

  const [mode, setMode] = useState('All' as ModeType);

  const onModeChangeHandler = (mode: ModeType) => {
    setMode(mode);
  };

  const [modList, setModList] = useState(data);

  useEffect(() => {
    const modifiedList = data.filter(todo => {
      switch(mode) {
        case 'All': return todo;
        case 'Active': return !todo.checked;
        case 'Completed': return todo.checked;
      }
    });
    setModList(modifiedList);
  }, [mode, data]);

  return (
    <div className='App'>
      <Header />
      <Panel lastDataId={data.length > 0 ? (data[data.length-1].id + 1) : 1} />
      <TodoList
        todoList={modList}
        currentMode={mode}
      />
      <Footer
        listLength={modList.length}
        currentMode={mode}
        onModeChange={onModeChangeHandler}
        onDeleteCompleted={onDeleteCompletedHandler}
      />
    </div>
  );
}

export default App;
































