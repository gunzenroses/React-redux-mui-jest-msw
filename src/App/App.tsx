import { useState, useEffect } from 'react';

import { Footer, Header, Panel, TodoList } from '../components'
import './App.css';

import data from './data.json';

function App() {
  const [todoList, setTodoList] = useState(data.todoList);

  const [mode, setMode] = useState('All' as ModeType);

  const onDeleteItem = (id: TodoItemType['id']) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  }

  const onAddItem = (text: string) => {
    setTodoList([
      ...todoList,
      {
        id: todoList[todoList.length - 1].id + 1,
        checked: false,
        text: text
      }
    ])
  }

  const onTextChange = (data: Omit<TodoItemType, 'checked'>) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === data.id) {
          return {
            ...data,
            checked: todo.checked,
          };
        }
        return todo;
      })
    );
  };

  const onCompleteChange = (data: Omit<TodoItemType, 'text'>) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === data.id) {
          return {
            ...data,
            text: todo.text,
          };
        }
        return todo;
      })
    );
  }

  const [modList, setModList] = useState(todoList);

  const onModeChangeHandler = (mode: ModeType) => {
    setMode(mode);
  };

  useEffect(() => {
    const modifiedList = todoList.filter((todo) => {
      switch (mode) {
        case 'All':
          return todo;
        case 'Active':
          return !todo.checked;
        case 'Completed':
          return todo.checked;
      }
    });
    setModList(modifiedList);
  }, [todoList, mode]);
  
  const onDeleteCompletedHandler = () => {
    setTodoList(
      todoList.filter(todo => !todo.checked)
    )
  }

  return (
    <div className='App'>
      <Header />
      <Panel onAdd={onAddItem} />
      <TodoList
        todoList={modList}
        onDelete={onDeleteItem}
        onTextChange={onTextChange}
        onCompletedChange={onCompleteChange}
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











