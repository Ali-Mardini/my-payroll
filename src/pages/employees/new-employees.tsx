import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../layouts/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Employee } from "../../types/employee";
import { v4 as uuidv4 } from "uuid";
import { subYears } from "date-fns";

const NewEmployee = () => {
  const navigate = useNavigate();
  const today = new Date();
  const sixtyYearsAgo = subYears(today, 60);

  const checkDuplicateStaffId = async (staffId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/staffs?staffId=${staffId}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking staff ID:", error);
      return false;
    }
  };

  const validationSchema = Yup.object({
    staffId: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "No special characters allowed")
      .required("Staff ID is required")
      .test(
        "checkDuplicateStaffId",
        "Staff ID already exists",
        async (value) => {
          if (value) {
            const isDuplicate = await checkDuplicateStaffId(value);
            return !isDuplicate;
          }
          return true;
        }
      ),
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters")
      .required("Name is required"),
    joiningDate: Yup.date()
      .max(today, "Joining date can't be in the future")
      .min(sixtyYearsAgo, "Joining date can't be more than 60 years ago")
      .required("Joining date is required"),
    basicSalary: Yup.number()
      .min(0, "Basic salary can't be negative")
      .required("Basic salary is required"),
    allowances: Yup.number()
      .min(0, "Salary allowances can't be negative")
      .required("Salary allowances are required"),
  });

  const handleSubmit = async (values: Employee) => {
    try {
      const response = await axios.post("http://localhost:3000/staffs", values);
      if (response.status === 201) {
        toast.success("Employee added successfully", {
          onClose: () => navigate("/"),
        });
      }
    } catch (error) {
      toast.error("Error adding employee");
      console.error("Error fetching staffs:", error);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      </div>
      <div className="flex flex-col items-center mx-auto mt-8">
        <Formik
          initialValues={{
            id: uuidv4(),
            staffId: "",
            name: "",
            joiningDate: "",
            basicSalary: 0,
            allowances: 0,
            currancy: "$",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-lg">
              <div className="mb-4">
                <label
                  htmlFor="staffId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Staff ID
                </label>
                <Field
                  type="text"
                  id="staffId"
                  name="staffId"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="staffId"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="joiningDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Joining Date
                </label>
                <Field
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="joiningDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="basicSalary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Basic Salary
                </label>
                <Field
                  type="number"
                  id="basicSalary"
                  name="basicSalary"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="basicSalary"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="allowances"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary Allowances
                </label>
                <Field
                  type="number"
                  id="allowances"
                  name="allowances"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <ErrorMessage
                  name="allowances"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Add Employee
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

const NewEmployeeWithAuthentication = withAuthenticationRequired(NewEmployee, {
  onRedirecting: () => <div>Loading...</div>,
});

export default NewEmployeeWithAuthentication;
