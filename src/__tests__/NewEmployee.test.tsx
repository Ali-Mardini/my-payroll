// NewEmployee.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import NewEmployeeWithAuthentication from '../pages/employees/new-employees';
import '@testing-library/jest-dom/vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NewEmployee component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({ status: 201 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders the form fields', () => {
    render(
      <MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Staff ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Joining Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Basic Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salary Allowances/i)).toBeInTheDocument();
  });

  test('validates the form correctly', async () => {
    render(
      <MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Add Employee/i));

    await waitFor(() => {
      expect(screen.getByText(/Staff ID is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Joining date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Basic salary is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Salary allowances are required/i)).toBeInTheDocument();
    });
  });

  test('submits the form successfully', async () => {
    render(
      <MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Staff ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Joining Date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Basic Salary/i), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Salary Allowances/i), { target: { value: '10000' } });

    fireEvent.click(screen.getByText(/Add Employee/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/staffs', {
        id: expect.any(String),
        staffId: '12345',
        name: 'John Doe',
        joiningDate: '2022-01-01',
        basicSalary: 50000,
        allowances: 10000,
        currancy: '$',
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Employee added successfully/i)).toBeInTheDocument();
    });
  });

  test('handles duplicate staff ID validation', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ staffId: '12345' }] });

    render(
      <MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Staff ID/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Joining Date/i), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Basic Salary/i), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Salary Allowances/i), { target: { value: '10000' } });

    fireEvent.click(screen.getByText(/Add Employee/i));

    await waitFor(() => {
      expect(screen.getByText(/Staff ID already exists/i)).toBeInTheDocument();
    });
  });
});
