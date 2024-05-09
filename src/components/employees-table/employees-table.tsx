import { useState } from 'react';
import EmployeeDetails from '../employees-details/employees-details';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

interface Employee {
  id: number;
  staffId: string;
  name: string;
  joiningDate: string;
  basicSalary: string;
  salaryAllowances: string;
}

interface EmployeesTableProps {
  data: Employee[];
}

const EmployeesTable = ({ data }: EmployeesTableProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = (editedEmployee: Employee) => {
    // Handle saving the edited employee data
    console.log('Edited Employee:', editedEmployee);
    setSelectedEmployee(null);
  };

  const handleClosePopup = () => {
    setSelectedEmployee(null);
  };

  return (
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
              <td className="px-6 py-4 whitespace-nowrap">{staff.joiningDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{staff.basicSalary}</td>
              <td className="px-6 py-4 whitespace-nowrap">{staff.salaryAllowances}</td>
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
                    // Handle delete action here
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
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
  );
};

export default EmployeesTable;
