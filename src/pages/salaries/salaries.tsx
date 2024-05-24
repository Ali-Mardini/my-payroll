import { useEffect, useState } from "react";
import Layout from "../../layouts/layout";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Employee } from "../../types/employee";
import axios from "axios";
import { Salary } from "../../types/salary";
import { LogRecord } from "../../types/logRecord";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  const handleProcessSalaries = async (values) => {
    const processedSalaries: Salary[] = [];

    employees.forEach((employee) => {
      const selectedMonth = values[`month-${employee.id}`];

      // Only process records with a selected month
      if (selectedMonth) {
        processedSalaries.push({
          id: employee.id,
          name: employee.name,
          basicSalary: parseFloat(employee.basicSalary.toString()),
          allowances: parseFloat(employee.allowances.toString()),
          additions: parseFloat(values[`additions-${employee.id}`] || "0"),
          deductions: parseFloat(values[`deductions-${employee.id}`] || "0"),
          month: selectedMonth,
          year: values[`year-${employee.id}`] || currentYear.toString(), // Get year value by employee ID or use currentYear
          total: calculateTotalSalary(employee),
          isEndOfService: values[`end-of-service-${employee.id}`] || false,
        });
      }
    });
    await submitSalaries(processedSalaries);
  };

  const validationSchema = Yup.object().shape({
    employees: Yup.array().of(
      Yup.object().shape({
        additions: Yup.number()
          .typeError('Must be a number')
          .min(0, 'Must be at least 0'),
        deductions: Yup.number()
          .typeError('Must be a number')
          .min(0, 'Must be at least 0'),
      })
    )
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
            <Formik
              initialValues={{
                employees: employees.reduce((acc, employee) => {
                  acc[employee.id] = {
                    additions: "",
                    deductions: "",
                    month: "",
                    year: currentYear.toString(),
                    endOfService: false,
                  };
                  return acc;
                }, {}),
              }}
              validationSchema={validationSchema}
              onSubmit={handleProcessSalaries}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="container mx-auto mt-8">
                    <div className="flex justify-between mb-3">
                      <h1 className="text-2xl font-bold mb-4">Salary Table</h1>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full flex items-center"
                      >
                        <PaperAirplaneIcon className="h-4 w-4 mr-3" />
                        Process salaries
                      </button>
                    </div>
                    <table className="w-full border-collapse border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-200 p-2 text-left">Name</th>
                          <th className="border border-gray-200 p-2 text-left">Basic Salary</th>
                          <th className="border border-gray-200 p-2 text-left">Allowances</th>
                          <th className="border border-gray-200 p-2 text-left">Additions</th>
                          <th className="border border-gray-200 p-2 text-left">Deductions</th>
                          <th className="border border-gray-200 p-2 text-left">Month</th>
                          <th className="border border-gray-200 p-2 text-left">Year</th>
                          <th className="border border-gray-200 p-2 text-left">Total Salary</th>
                          <th className="border border-gray-200 p-2 text-left">End of Service</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => (
                          <tr key={employee.id}>
                            <td className="border border-gray-200 p-2">{employee.name}</td>
                            <td className="border border-gray-200 p-2">{employee.basicSalary}</td>
                            <td className="border border-gray-200 p-2">{employee.allowances}</td>
                            <td className="border border-gray-200 p-2">
                              <Field
                                name={`employees[${employee.id}].additions`}
                                type="text"
                                className="border-2 border-gray-300 p-1 rounded-md w-full"
                                onChange={handleChange}
                              />
                              <ErrorMessage name={`employees[${employee.id}].additions`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="border border-gray-200 p-2">
                              <Field
                                name={`employees[${employee.id}].deductions`}
                                type="text"
                                className="border-2 border-gray-300 p-1 rounded-md w-full"
                                onChange={handleChange}
                              />
                              <ErrorMessage name={`employees[${employee.id}].deductions`} component="div" className="text-red-500 text-sm mt-1" />
                            </td>
                            <td className="border border-gray-200 p-2">
                              <Field
                                as="select"
                                name={`employees[${employee.id}].month`}
                                className="border-2 border-gray-300 p-1 rounded-md w-full"
                                onChange={handleChange}
                              >
                                {months.map((month, index) => (
                                  <option key={index} value={month}>{month}</option>
                                ))}
                              </Field>
                            </td>
                            <td className="border border-gray-200 p-2">
                              <Field
                                as="select"
                                name={`employees[${employee.id}].year`}
                                className="border-2 border-gray-300 p-1 rounded-md w-full"
                                onChange={handleChange}
                              >
                                {yearOptions.map((year, index) => (
                                  <option key={index} value={year}>{year}</option>
                                ))}
                              </Field>
                            </td>
                            <td className="border border-gray-200 p-2">
                              {calculateTotalSalary(employee)}
                            </td>
                            <td className="border border-gray-200 p-2">
                              <Field
                                name={`employees[${employee.id}].endOfService`}
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600"
                                onChange={handleChange}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {activeTab === "logs" && (
            <div className="container mx-auto mt-8">
              <h1 className="text-2xl font-bold mb-4">Logs</h1>
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 p-2 text-left">Date</th>
                    <th className="border border-gray-200 p-2 text-left">Message</th>
                    <th className="border border-gray-200 p-2 text-left">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="border border-gray-200 p-2">{log.date}</td>
                      <td className="border border-gray-200 p-2">{log.message}</td>
                      <td className="border border-gray-200 p-2">
                        <span className={getLevelColor(log.level)}>{log.level}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};


const SalarieseWithAuthentication = withAuthenticationRequired(Salaries, {
	onRedirecting: () => <div>Loading...</div>,
  });
  
export default SalarieseWithAuthentication;