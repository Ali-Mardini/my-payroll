import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EmployeesWithAuthentication from '../pages/employees/employees';
import { render } from '@testing-library/react';

const renderEmployeesPage = () =>{
	const { container } = render(
	<MemoryRouter>
        <ToastContainer />
        <EmployeesWithAuthentication />
	</MemoryRouter>
    );

	return container;
};

describe("Test ==>  Employees page", () => {
  test("renders correctly", () => {
    const container  = renderEmployeesPage();
    expect(container).toMatchSnapshot();
  });
});