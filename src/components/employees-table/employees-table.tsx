import { useState } from "react";
import EmployeeDetails from "../employees-details/employees-details";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Employee } from "../../types/employee";
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EmployeesTableProps {
  data: Employee[];
}

const EmployeesTable = ({ data }: EmployeesTableProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = async (editedEmployee: Employee) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/staffs/${editedEmployee.id}`,
        editedEmployee
      );
      if (response.status == 200) {
		toast.success("Employee details saved successfully!", {
			onClose: () => window.location.reload(),
		});
      }
    } catch (error) {
		toast.error("Error saving employee details.");
    }
    setSelectedEmployee(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/staffs/${id}`);
      if (response.status == 200) {
		toast.success("Employee deleted successfully!", {
			onClose: () => window.location.reload(),
		});
      }
    } catch (error) {
		toast.error("Error deleting employee.");
    }
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className='my-2 flex'>
        <Link to='/new-staff' className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full flex items-center ml-auto mr-4">
          <PlusCircleIcon className="h-4 w-4 mr-3" />
          Add Staff
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Staff Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Basic Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary Allowances
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{staff.staffId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {staff.joiningDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {staff.currancy}
                  {staff.basicSalary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {staff.currancy}
                  {staff.allowances}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() => handleEditClick(staff)}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-2"
                    onClick={() => {
                      handleDelete(staff.id);
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedEmployee && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <EmployeeDetails
              employee={selectedEmployee}
              onSave={handleSave}
              onCancel={handleClosePopup}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeesTable;
