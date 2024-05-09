import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useState } from "react";
import Layout from "../../layouts/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../types/employee";
import { v4 as uuidv4 } from "uuid";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Employee>({
    id: uuidv4(),
    staffId: "",
    name: "",
    joiningDate: "",
    basicSalary: 0,
    allowances: 0,
    currancy: "$",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/staffs",
        formData
      );
      if (response.status == 201) {
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
    // Reset form data after submission
    setFormData({
      id: "",
      staffId: "",
      name: "",
      joiningDate: "",
      basicSalary: 0,
      allowances: 0,
      currancy: "$",
    });
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      </div>
      <div className="flex flex-col items-center mx-auto mt-8">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="mb-4">
            <label
              htmlFor="staffId"
              className="block text-sm font-medium text-gray-700"
            >
              Staff ID
            </label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="joiningDate"
              className="block text-sm font-medium text-gray-700"
            >
              Joining Date
            </label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="basicSalary"
              className="block text-sm font-medium text-gray-700"
            >
              Basic Salary
            </label>
            <input
              type="number"
              id="basicSalary"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="salaryAllowances"
              className="block text-sm font-medium text-gray-700"
            >
              Salary Allowances
            </label>
            <input
              type="number"
              id="allowances"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add Employee
          </button>
        </form>
      </div>
    </Layout>
  );
};

const NewEmployeeWithAuthentication = withAuthenticationRequired(NewEmployee, {
  onRedirecting: () => <div>loading...</div>,
});

export default NewEmployeeWithAuthentication;
