import { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Employee } from "../../types/employee";
import axios from "axios";
import { Salary } from "../../types/salary";
import { LogRecord } from "../../types/logRecord";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const Salaries = () => {
  const [activeTab, setActiveTab] = useState("salaries");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [logs, setLogs] = useState<LogRecord[]>([]);
  const [additionsMap, setAdditionsMap] = useState<{ [key: string]: string }>({});
  const [deductionsMap, setDeductionsMap] = useState<{ [key: string]: string }>({});

  const handleAdditionsChange = (event, employeeId: string) => {
    setAdditionsMap((prevMap) => ({
      ...prevMap,
      [employeeId]: event.target.value,
    }));
  };

  const handleDeductionsChange = (event, employeeId: string) => {
    setDeductionsMap((prevMap) => ({
      ...prevMap,
      [employeeId]: event.target.value,
    }));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/staffs");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    const getLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    getStaffs();
    getLogs();
  }, []);

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

  const calculateTotalSalary = (employee: Employee) => {
    const basicSalary = parseFloat(employee.basicSalary.toString());
    const allowances = parseFloat(employee.allowances.toString());
    let additionsValue = 0;
    let deductionsValue = 0;
    try {
      additionsValue = parseFloat(additionsMap[employee.id]?.toString() || "0");
      deductionsValue = parseFloat(deductionsMap[employee.id]?.toString() || "0");
    } catch (error) {
      console.error("Error parsing addition or deduction value:", error);
    }
    return basicSalary + allowances + additionsValue - deductionsValue;
  };

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [currentYear, currentYear - 1];

  const submitSalaries = async (processedSalarie: Salary[]) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/salaries",
        processedSalarie
      );
      if (response.status == 201) {
        await logTransactions(processedSalarie.length, true);
        window.location.reload();
      }
    } catch (error) {
      await logTransactions(processedSalarie.length, false);
      console.error("Error fetching staffs:", error);
    }
  };

  const logTransactions = async (
    transactionCount: number,
    success: boolean
  ) => {
    try {
      const log: LogRecord = {
        id: uuidv4(),
        date: `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`,
        message: success
          ? `${transactionCount} has been processed successfully!`
          : `${transactionCount} failed to process!`,
        level: success ? "info" : "error",
      };
      const response = await axios.post("http://localhost:3000/logs", log);
      if (response.status == 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    }
  };

  const handleProcessSalaries = async () => {
    const processedSalaries: Salary[] = [];

    employees.forEach((employee) => {
      const selectedMonth = document.getElementById(
        `month-${employee.id}`
      )?.value;

      // Only process records with a selected month
      if (selectedMonth) {
        processedSalaries.push({
          id: employee.id,
          name: employee.name,
          basicSalary: parseFloat(employee.basicSalary.toString()),
          allowances: parseFloat(employee.allowances.toString()),
          additions: parseFloat(additionsMap[employee.id]?.toString() || "0"),
          deductions: parseFloat(deductionsMap[employee.id]?.toString() || "0"),
          month: selectedMonth,
          year:
            document.getElementById(`year-${employee.id}`)?.value ||
            currentYear.toString(), // Get year value by employee ID or use currentYear
          total: calculateTotalSalary(employee),
          isEndOfService:
            document.getElementById(`end-of-service-${employee.id}`)?.checked ||
            false,
        });
      }
    });
    await submitSalaries(processedSalaries);
  };

  const validationSchema = Yup.object().shape({
    additionsMap: Yup.object().shape({
      [Yup.ref('employeeId')]: Yup.number()
        .typeError('Must be a number')
        .min(0, 'Must be at least 0'),
    }),
    deductionsMap: Yup.object().shape({
      [Yup.ref('employeeId')]: Yup.number()
        .typeError('Must be a number')
        .min(0, 'Must be at least 0'),
    }),
  });

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Salaries</h1>
        <p className="text-lg mb-4">Manage your team Salaries efficiently</p>
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
        <div className="p-4">
          {activeTab === "salaries" && (
            <div>
              <div className="container mx-auto mt-8">
                <div className="flex justify-between mb-3">
                  <h1 className="text-2xl font-bold mb-4">Salary Table</h1>
                  <button
                    onClick={handleProcessSalaries}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full flex items-center"
                  >
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
                          <input
                            type="number"
                            value={additionsMap[employee.id] || ""}
                            onChange={(event) =>
                              handleAdditionsChange(event, employee.id)
                            }
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <input
                            type="number"
                            value={deductionsMap[employee.id] || ""}
                            onChange={(event) =>
                              handleDeductionsChange(event, employee.id)
                            }
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <select
                            id={`month-${employee.id}`}
                            className="w-full p-1 border border-gray-300 rounded"
                          >
                            {months.map((month, index) => (
                              <option key={index} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <select
                            id={`year-${employee.id}`}
                            className="w-full p-1 border border-gray-300 rounded"
                          >
                            {yearOptions.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {calculateTotalSalary(employee)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            id={`end-of-service-${employee.id}`}
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
            <div>
              <h1 className="text-2xl font-bold mb-4">Logs</h1>
              {logs.length === 0 ? (
                <p>No logs found.</p>
              ) : (
                <ul>
                  {logs.map((log) => (
                    <li
                      key={log.id}
                      className={`border-b border-gray-200 py-2 ${getLevelColor(
                        log.level
                      )}`}
                    >
                      <p className="font-semibold">{log.message}</p>
                      <p className="text-sm">{log.date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const SalariesWithAuthentication = withAuthenticationRequired(Salaries, {
  onRedirecting: () => <div>Loading...</div>,
});

export default SalariesWithAuthentication;