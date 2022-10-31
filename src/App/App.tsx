import { useEffect, useState } from 'react';

import { useMyDispatch, useMyList } from '../redux/hooks';
import { addTodo, getTodos, changeTodo, deleteTodo } from '../redux/todoThunk';
import { Footer, Header, Panel, TodoList } from '../components';
import './App.css';

function App() {
  const dispatch = useMyDispatch();

  const data: TodoItemType[] = useMyList();

  const [todoList, setTodoList] = useState(data);

  useEffect(() => {
    dispatch(getTodos());
  }, [todoList]);

  const onDeleteItem = (id: TodoItemType['id']) => {
    dispatch(deleteTodo([id]));
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  const onAddItem = (text: string) => {
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newItem = {
      id: newId,
      checked: false,
      text: text,
    };
    dispatch(addTodo(newItem));
    setTodoList([...data, newItem]);
  }

  const onChangeItem = (data: TodoItemType) => {
    dispatch(changeTodo(data));
    setTodoList(
      todoList.map(todo => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      })
    )
  };

  const onDeleteCompletedHandler = () => {
    const completedList = data.filter((todo) => todo.checked);
    if (completedList.length < 1) return;
    const completedIds: TodoItemType['id'][] = completedList.map((todo) => todo.id);
    dispatch(deleteTodo(completedIds));
    setTodoList(
      todoList.filter(todo => !todo.checked)
    )
  }

  const [mode, setMode] = useState('All' as ModeType);

  const onModeChangeHandler = (mode: ModeType) => {
    setMode(mode);
  };

  return (
    <div className='App'>
      <Header />
      <Panel onAdd={onAddItem} />
      <TodoList
        todoList={data}
        currentMode={mode}
        onDelete={onDeleteItem}
        onChange={onChangeItem}
      />
      <Footer
        listLength={data.length}
        currentMode={mode}
        onModeChange={onModeChangeHandler}
        onDeleteCompleted={onDeleteCompletedHandler}
      />
    </div>
  );
}

export default App;
































