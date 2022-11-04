import { rest } from 'msw';
import { initialState } from '../test-utils/preloadedState'

export const regularHandlers = [
  rest.get('http://localhost:3004/:listName', (req, res, ctx) => {
    const { listName } = req.params;
    if (listName === 'todoList') {
      return res(ctx.status(200), ctx.json(initialState.todoList));
    }
    return res(ctx.status(404));
  }),
  rest.post('http://localhost:3004/todoList', (req, res, ctx) => {
    const newPost = req.json();
    return res(ctx.status(200), ctx.json([...initialState.todoList, newPost]));
  }),
  rest.put('http://localhost:3004/todoList/:itemId', (req, res, ctx) => {
    const changedPost = req.json();
    const { itemId } = req.params;
    if (typeof itemId === 'string') {
      const id = parseInt(itemId);
      const updatedState = initialState.todoList.map((item) => {
        if (item.id === id) {
          return changedPost;
        }
        return item;
      });
      return res(ctx.status(200), ctx.json([...updatedState]));
    }
    return res(ctx.status(404));
  }),
  rest.delete('http://localhost:3004/todoList/:itemId', (req, res, ctx) => {
    const { itemId } = req.params;
    if (typeof itemId === 'string') {
      const id = parseInt(itemId);
      const updatedState = initialState.todoList.filter((item) => {
        if (item.id !== id) return item;
      });
      return res(ctx.status(200), ctx.json([...updatedState]));
    }
  }),
];
