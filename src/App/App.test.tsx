import React from 'react';
import { render, screen } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils/testWrapper';
import { preloadedState } from '../../test-utils/preloadedState';
import App from './App';

test('App should match snapshot', () => {
  const { container } = renderWithProviders(
    <App />,
    { preloadedState }
  );

  expect(container).toMatchSnapshot();
});


