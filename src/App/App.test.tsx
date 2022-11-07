import { fireEvent, screen, waitFor } from '@testing-library/react';

import { initialState } from '../test-utils/preloadedState';
import { renderWithProviders } from '../test-utils/testWrapper';
import App from './App';

test('App should match snapshot', async () => {
  const { container } = renderWithProviders(<App />);

  await waitFor(() => screen.getAllByLabelText('todoItem'));

  expect(container).toMatchSnapshot();
});

describe('button Add new todo', () => {
  test('works when smth typed in', async () => {
    const newText = 'something new';

    renderWithProviders(<App />);

    await waitFor(() => screen.getAllByLabelText('todoItem'));

    const inputTodo = screen.getByPlaceholderText(
      "What's need to be done?"
    ) as HTMLInputElement;
    const addButton = screen.getByLabelText(/addButton/i);
    
    await waitFor(() => {
      fireEvent.change(inputTodo, { target: { value: newText } });
    });

    expect(inputTodo.value).toBe(newText);

    await waitFor(() => {
      fireEvent.click(addButton);
    })

    expect(inputTodo.value).toBe('');
  })
})

describe('Change todoItem',  () => {
  const newText = 'this is it';

  test('should work after pushing the change button', async () => {
    renderWithProviders(<App />);
    await waitFor(() => screen.getAllByLabelText('todoItem'));
    const firstTodo = screen.getByDisplayValue(
      initialState.todoList[0].text
    ) as HTMLInputElement;

    const changeBtn = screen.getAllByLabelText('changeBtn')[0];
    await waitFor(() => {
      fireEvent.click(changeBtn);
    }).then(() => {
      fireEvent.change(firstTodo, { target: { value: newText } });
    });
 
    expect(firstTodo.value).toBe(newText);
  })

  test('should not work when change button is not pushed', async () => {
    renderWithProviders(<App />);

    await waitFor(() => screen.getAllByLabelText('todoItem'));

    const firstTodo = screen.getByDisplayValue(
      initialState.todoList[0].text
    ) as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(firstTodo, { target: { value: newText } });
    });

    expect(firstTodo).not.toHaveDisplayValue(newText);
  })
})

describe('Mode buttons', () => {
  test('should show only Completed item, when mode is relevant', async () => {
    renderWithProviders(<App />),
    await waitFor(() => { screen.getAllByLabelText('todoItem')});
    const todoItems = screen.getAllByLabelText('todoItem').length;
    const completedBtn = screen.getByTestId(/Completed/i);

    await waitFor(() => {
      fireEvent.click(completedBtn);
    })
    const todoItemsAfter = screen.getAllByLabelText('todoItem').length;

    expect(todoItems).toBeGreaterThan(todoItemsAfter);
  });

    test('should show only Active item, when mode is relevant', async () => {
      renderWithProviders(<App />),
        await waitFor(() => {
          screen.getAllByLabelText('todoItem');
        });
      const todoItems = screen.getAllByLabelText('todoItem').length;
      const activeBtn = screen.getByTestId(/Active/i);

      await waitFor(() => {
        fireEvent.click(activeBtn);
      });
      const todoItemsAfter = screen.getAllByLabelText('todoItem').length;

      expect(todoItems).toBeGreaterThan(todoItemsAfter);
    });
})