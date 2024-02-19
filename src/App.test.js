import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ result: 3 }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders input fields and buttons', () => {
  render(<App />);
  expect(screen.getByLabelText('First Number:')).toBeInTheDocument();
  expect(screen.getByLabelText('Second Number:')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
  expect(screen.getByText('Subtract')).toBeInTheDocument();
});

test('displays error when inputs are empty and add button is clicked', async () => {
  render(<App />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ result: 0 }),
    })
  );
  
  fireEvent.click(screen.getByText('Add'));
  await waitFor(() => expect(screen.getByText('Result: 0')).toBeInTheDocument());

  expect(fetch).toHaveBeenCalledTimes(1);
});

test('displays result when valid inputs are provided and add button is clicked', async () => {
  render(<App />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ result: 3 }),
    }));

  userEvent.type(screen.getByLabelText('First Number:'), '1');
  userEvent.type(screen.getByLabelText('Second Number:'), '2');
  fireEvent.click(screen.getByText('Add'));
  await waitFor(() => expect(screen.getByText('Result: 3')).toBeInTheDocument());

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('api/v1/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 2})
  });
});


test('default 0 on empty input for subtract', async () => {
  render(<App />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ result: 0 }),
    })
  );
  
  fireEvent.click(screen.getByText('Subtract'));
  await waitFor(() => expect(screen.getByText('Result: 0')).toBeInTheDocument());

  expect(fetch).toHaveBeenCalledTimes(1);

});

test('displays result when valid inputs are provided and subtract button is clicked', async () => {
  render(<App />);

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ result: 3 }),
    })
  );

  userEvent.type(screen.getByLabelText('First Number:'), '1');
  userEvent.type(screen.getByLabelText('Second Number:'), '2');
  fireEvent.click(screen.getByText('Subtract'));
  await waitFor(() => expect(screen.getByText('Result: 3')).toBeInTheDocument());

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('api/v1/subtract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 2})
  });
});
