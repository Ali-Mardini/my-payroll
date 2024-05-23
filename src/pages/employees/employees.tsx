import { withAuthenticationRequired } from "@auth0/auth0-react";
import EmployeesTable from "../../components/employees-table/employees-table";
import Layout from "../../layouts/layout";
import { useEffect, useState } from "react";
import { Employee } from "../../types/employee";
import axios from "axios";
import { toast } from 'react-toastify';

const Employees = () => {
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/staffs");
        setData(response.data);
      } catch (error) {
		toast.error("Error gettings employees.");
      }
    };

    getStaffs();
  }, []);


  const search = async (value: string) => {
	try {
        const response = await axios.get(`http://localhost:3000/staffs?name=${value}`);
        setData(response.data);
      } catch (error) {
		toast.error("Error gettings employees.");
      }
  }

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Employees</h1>
        <p className="text-lg mb-4">Manage your team efficiently</p>
        <div className="flex items-center">
          <input
            type="text"
			onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => search((e.target as HTMLInputElement).value)}
            placeholder="Staff name..."
            className="py-2 px-4 text-black border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 flex-grow"
          />
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
