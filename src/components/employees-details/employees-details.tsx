import { useState } from "react";

interface Employee {
  id: number;
  staffId: string;
  name: string;
  joiningDate: string;
  basicSalary: string;
  salaryAllowances: string;
}

const EmployeeDetails: React.FC<{
  employee: Employee;
  onSave: (editedEmployee: Employee) => void;
  onCancel: () => void;
}> = ({ employee, onSave, onCancel }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={editedEmployee.name}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-2">
        Staff Id:
        <input
          type="text"
          name="staffId"
          value={editedEmployee.staffId}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Joining Date:
        <input
          type="text"
          name="joiningDate"
          value={editedEmployee.joiningDate}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-2">
        Basic Salary:
        <input
          type="text"
          name="basicSalary"
          value={editedEmployee.basicSalary}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <label className="block mb-4">
        Salary Allowances:
        <input
          type="text"
          name="salaryAllowances"
          value={editedEmployee.salaryAllowances}
          onChange={handleChange}
          className="form-input mt-1 block w-full"
        />
      </label>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
          onClick={() => onSave(editedEmployee)}
        >
          Save
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
