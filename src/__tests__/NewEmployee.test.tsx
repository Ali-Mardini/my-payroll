import { render} from '@testing-library/react';
import { describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NewEmployeeWithAuthentication from "../pages/employees/new-employees";

const renderNewEmployeePage = () =>{
	const { container } = render(
	<MemoryRouter>
        <ToastContainer />
        <NewEmployeeWithAuthentication />
	</MemoryRouter>
    );

	return container;
};

describe("Test ==>  New Employee page", () => {
  test("renders correctly", () => {
    const container  = renderNewEmployeePage();
    expect(container).toMatchSnapshot();
  });

//   test('Valid New Employee form', async () => {
//     renderNewEmployeePage();
	
//     const staffIdInput = screen.getByLabelText(/Staff ID/i);
//     const nameInput = screen.getByLabelText(/Name/i);
//     const joiningDateInput = screen.getByLabelText(/Joining Date/i);
//     const basicSalaryInput = screen.getByLabelText(/Basic Salary/i);
//     const allowancesInput = screen.getByLabelText(/Salary Allowances/i);

//     fireEvent.change(staffIdInput, { target: { value: 'S00120' } });
//     fireEvent.change(nameInput, { target: { value: 'Ali Mardini' } });
//     fireEvent.change(joiningDateInput, { target: { value: '2022-01-01' } });
//     fireEvent.change(basicSalaryInput, { target: { value: '50000' } });
//     fireEvent.change(allowancesInput, { target: { value: '10000' } });

//     expect(staffIdInput.value).toBe('S00120');
//     expect(nameInput.value).toBe('Ali Mardini');
//     expect(joiningDateInput.value).toBe('2022-01-01');
//     expect(basicSalaryInput.value).toBe('50000');
//     expect(allowancesInput.value).toBe('10000');
//   });
});
