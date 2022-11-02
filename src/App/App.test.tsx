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
  test('works when smth typed it', async () => {
    const newText = 'something new';

    renderWithProviders(<App />);

    await waitFor(() => screen.getAllByLabelText('todoItem'));

    const inputTodo = screen.getByPlaceholderText("What's need to be done?") as HTMLInputElement;
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
    const firstTodo = screen.getByDisplayValue(initialState[0].text) as HTMLInputElement;

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
      initialState[0].text
    ) as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(firstTodo, { target: { value: newText } });
    });

    expect(firstTodo).not.toHaveDisplayValue(newText);
  })
})

describe('Delete todoItem', () => {
  test('should work', async () => {
    const firstValue = initialState[0].text;
    renderWithProviders(<App />),
    await waitFor(() => { screen.getAllByLabelText('todoItem')});
    const firstTodo = screen.getByDisplayValue(firstValue);
    const deleteBtn = screen.getAllByLabelText('deleteBtn')[0];

    expect(firstTodo).toBeInTheDocument();

    await waitFor(() => {
      fireEvent.click(deleteBtn);
    });
    console.log('should be after 4');

    const newFirstTodo = screen
      .getAllByLabelText('todoItem')[0]
      .getElementsByTagName('input')[0].value;
    console.log(newFirstTodo);

    expect(firstTodo).not.toBeInTheDocument();
  });
})

describe('', () => {

})