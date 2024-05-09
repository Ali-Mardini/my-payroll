import { withAuthenticationRequired } from '@auth0/auth0-react';
import EmployeesTable from '../../components/employees-table/employees-table';
import Layout from "../../layouts/layout";

const Employees = () => {
  const data = [
    {
      id: 1,
      staffId: "S001",
      name: "John Doe",
      joiningDate: "2022-01-01",
      basicSalary: "$5000",
      salaryAllowances: "$1000",
    },
    {
      id: 2,
      staffId: "S002",
      name: "Jane Doe",
      joiningDate: "2022-02-15",
      basicSalary: "$5500",
      salaryAllowances: "$1200",
    },
    // Add more data items as needed
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Employees</h1>
        <p className="text-lg mb-4">Manage your team efficiently</p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 flex-grow"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded-r-md">
            Search
          </button>
        </div>
      </div>

     <EmployeesTable data={data} />
    </Layout>
  );
};


const EmployeesWithAuthentication = withAuthenticationRequired(Employees, {
    onRedirecting: () => <div>loading...</div>,
});

export default EmployeesWithAuthentication;
