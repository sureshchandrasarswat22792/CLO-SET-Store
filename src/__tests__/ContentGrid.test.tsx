import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import StorePage from '../pages/StorePage';
import contentsReducer from '../features/contents/contentsSlice';
import { Pricing } from '../features/contents/contentsTypes';

test('renders content and filters Paid items (with act)', async () => {

  const store = configureStore({
    reducer: { contents: contentsReducer },
    preloadedState: {
      contents: {
        items: [
          { id: 'content-001', title: 'Yellow green coat', creator: 'Adam', price: 50, pricingOption: Pricing.Paid, imagePath: '...' },
          { id: 'content-002', title: 'Brown Anorak', creator: 'Benny', price: 30, pricingOption: Pricing.Free, imagePath: '...' },
          { id: 'content-003', title: 'Block shape mini bag', creator: 'Catlin', price: 15, pricingOption: Pricing.View_Only, imagePath: '...' },
        ],
        status: 'succeeded',
        error: null,
      },
    }
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <StorePage />
      </Provider>
    );
  });

  expect(screen.getByText(/Yellow green coat/i)).toBeInTheDocument();
  expect(screen.getByText(/Brown Anorak/i)).toBeInTheDocument();
  expect(screen.getByText(/Block shape mini bag/i)).toBeInTheDocument();

  const paidCheckbox = screen.getByLabelText(/Paid/i);
  await act(async () => {
    await userEvent.click(paidCheckbox);
  });

  await act(async () => {
    await waitFor(() => {
      expect(screen.getByText(/Yellow green coat/i)).toBeInTheDocument();
      expect(screen.queryByText(/Brown Anorak/i)).toBeNull();
      expect(screen.queryByText(/Block shape mini bag/i)).toBeNull();
    });
  });
});
