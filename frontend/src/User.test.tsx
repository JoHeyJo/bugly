// Test User component
//dependencies
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';

//components
import User from './User';

jest.mock('axios');


test('renders data from API', async () => {
  // Define a fake response
  const response = {
    data: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    },
  };
  // Mock the Axios get method
  (axios.get as jest.Mock).mockResolvedValue(response);

  // Render the component
  const { getByText } = render(<User />);

  // Wait for the data to load
  await waitFor(() => {
    // Assert that the component renders the data
    expect(getByText(response.data.firstName)).toBeInTheDocument();
    expect(getByText(response.data.id.toString())).toBeInTheDocument();
  });
})

it("renders without crashing", function () {
  render(<User />);
})