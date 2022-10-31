import { useState } from 'react';

import { Footer, Header, Panel, TodoList } from './components'
import './App.css';

import data from './components/data.json';

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

  const onModeChangeHandler = (mode: ModeType) => {
    setMode(mode);
  };

  const onDeleteCompletedHandler = () => {
    setTodoList(
      todoList.filter(todo => !todo.checked)
    )
  }

  return (
    <div className='App'>
      <Header />
      <Panel onAdd={onAddItem}/>
      <TodoList 
        todoList={todoList} 
        onDelete={onDeleteItem} 
        onTextChange={onTextChange}
        onCompletedChange={onCompleteChange}
      />
      <Footer
        listLength={todoList.length} 
        currentMode={mode}
        onModeChange={onModeChangeHandler}
        onDeleteCompleted={onDeleteCompletedHandler}
      />
    </div>
  );
}

export default App;











