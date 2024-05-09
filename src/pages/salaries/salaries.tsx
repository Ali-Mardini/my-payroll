import { useState } from "react";
import Layout from "../../layouts/layout";

const Salaries = () => {
  const [activeTab, setActiveTab] = useState("salaries");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  interface Employee {
    id: number;
    name: string;
    basicSalary: number;
    month: string;
    year: number;
    isEndOfService: boolean;
  }

  const sampleData: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      basicSalary: 5000,
      month: "January",
      year: 2024,
      isEndOfService: false,
    },
    {
      id: 2,
      name: "Jane Doe",
      basicSalary: 6000,
      month: "January",
      year: 2024,
      isEndOfService: true,
    },
    // Add more sample data as needed
  ];

  const [employees, setEmployees] = useState<Employee[]>(sampleData);

  const handleEndOfServiceChange = (employeeId: number, isChecked: boolean) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, isEndOfService: isChecked }
          : employee
      )
    );
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Salaries</h1>
        <p className="text-lg mb-4">Manage your team Salaries efficiently</p>
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
      <div className="container mx-auto mt-8">
        <div className="flex mb-4">
          <button
            className={`mr-4 px-4 py-2 border-b-2 border-transparent focus:outline-none ${
              activeTab === "salaries"
                ? "border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("salaries")}
          >
            Salaries
          </button>
          <button
            className={`px-4 py-2 border-b-2 border-transparent focus:outline-none ${
              activeTab === "logs"
                ? "border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("logs")}
          >
            Logs
          </button>
        </div>
        <div>
          {activeTab === "salaries" && (
            <div>
              <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-bold mb-4">Salary Table</h1>
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">
                        Employee Name
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Basic Salary
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Month
                      </th>
                      <th className="border border-gray-200 px-4 py-2">Year</th>
                      <th className="border border-gray-200 px-4 py-2">
                        End of Service
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.basicSalary}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.month}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.year}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 flex items-center">
                          <input
                            type="checkbox"
                            checked={employee.isEndOfService}
                            onChange={(e) =>
                              handleEndOfServiceChange(
                                employee.id,
                                e.target.checked
                              )
                            }
                            className="mr-2"
                          />
                          Mark as End of Service
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "logs" && (
            <div>
              {/* Render Logs Tab Content */}
              <h2 className="text-lg font-semibold mb-2">Logs Tab Content</h2>
              <p>This is the content for the Logs tab.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Salaries;
