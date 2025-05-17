import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookLecture from '../pages/student/BookLecture';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

// Mock axios
jest.mock('axios');

describe('BookLecture Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('userId', '1');

    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Dr. John Doe', email: 'john@example.com' },
        { id: 2, name: 'Prof. Jane Smith', email: 'jane@example.com' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders and submits the appointment form', async () => {
    render(
      <BrowserRouter>
        <BookLecture />
      </BrowserRouter>
    );

    // Wait for lecturers to load
    await waitFor(() => {
      expect(screen.getByText(/Dr. John Doe/i)).toBeInTheDocument();
    });

    // Fill form fields
    fireEvent.change(screen.getByLabelText(/Course Name/i), {
      target: { value: 'Computer Science' },
    });

    fireEvent.change(screen.getByLabelText(/Module Name/i), {
      target: { value: 'HCI401T' },
    });

    fireEvent.change(screen.getByLabelText(/Select Lecturer/i), {
      target: { value: '1' },
    });

    fireEvent.change(screen.getByLabelText(/Preferred Date/i), {
      target: { value: '2025-05-20' },
    });

    fireEvent.change(screen.getByLabelText(/Preferred Time/i), {
      target: { value: '10:00' },
    });

    fireEvent.change(screen.getByLabelText(/Additional Details/i), {
      target: { value: 'Need help with final project' },
    });

    // Mock successful booking
    axios.post.mockResolvedValueOnce({ status: 200 });

    // Submit form
    fireEvent.click(screen.getByText(/Book Appointment/i));

    // Expect POST to be called with correct payload
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/appointment/book',
        expect.objectContaining({
          studentId: 1,
          lecturerId: 1,
          courseName: 'Computer Science',
          moduleName: 'HCI401T',
          date: '2025-05-20',
          time: '10:00:00',
          location: 'Building A, Room 205',
          description: 'Need help with final project',
        }),
        expect.objectContaining({
          headers: { Authorization: 'Bearer test-token' },
        })
      )
    );
  });
});
