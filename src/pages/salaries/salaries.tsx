import { useState } from "react";
import Layout from "../../layouts/layout";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { withAuthenticationRequired } from '@auth0/auth0-react';

const Salaries = () => {
  const [activeTab, setActiveTab] = useState("salaries");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  interface LogRecord {
    id: number;
    date: string;
    message: string;
    level: string;
  }

  const sampleLogs: LogRecord[] = [
    {
      id: 1,
      date: "2024-05-01",
      message: "Error occurred during processing",
      level: "Error",
    },
    {
      id: 2,
      date: "2024-05-02",
      message: "Successfully processed data",
      level: "Info",
    },
    // Add more sample logs as needed
  ];

  interface Employee {
    id: number;
    name: string;
    basicSalary: number;
    allowances: number;
    additions: number;
    deductions: number;
    month: string;
    year: number;
    total: number;
    isEndOfService: boolean;
  }

  const sampleData: Employee[] = [
    {
      id: 1,
      name: "John Doe",
      basicSalary: 5000,
      allowances: 5000,
      additions: 0,
      deductions: 0,
      month: "January",
      year: 2024,
      total: 0,
      isEndOfService: false,
    },
    {
      id: 2,
      name: "Jane Doe",
      basicSalary: 6000,
      allowances: 5000,
      additions: 0,
      deductions: 0,
      month: "January",
      year: 2024,
      total: 0,
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

  const getLevelColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
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
                <div className="flex justify-between mb-3">
                  <h1 className="text-2xl font-bold mb-4">Salary Table</h1>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full flex items-center">
                      <PaperAirplaneIcon className="h-4 w-4 mr-3" />
                      Process salaries
                    </button>
                </div>
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
                        Allowances
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Additions
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Deductions
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Month
                      </th>
                      <th className="border border-gray-200 px-4 py-2">Year</th>
                      <th className="border border-gray-200 px-4 py-2">
                        Total
                      </th>
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
                          {employee.allowances}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <input type="number" value={employee.additions} />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <input type="number" value={employee.deductions} />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.month}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.year}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {employee.total}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === "logs" && (
            <div className="container mx-auto mt-8">
              <h1 className="text-2xl font-bold mb-4">Logs Records</h1>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">Date</th>
                      <th className="border border-gray-200 px-4 py-2">
                        Message
                      </th>
                      <th className="border border-gray-200 px-4 py-2">
                        Level
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-100">
                        <td className="border border-gray-200 px-4 py-2">
                          {log.date}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {log.message}
                        </td>
                        <td
                          className={`border border-gray-200 px-4 py-2 ${getLevelColor(
                            log.level
                          )}`}
                        >
                          {log.level}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};


const SalariesWithAuthentication = withAuthenticationRequired(Salaries, {
    onRedirecting: () => <div>loading...</div>,
});

export default SalariesWithAuthentication;