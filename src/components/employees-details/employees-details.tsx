import { Employee } from "../../types/employee";
import { subYears } from "date-fns";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface EmployeeDetailsProps {
  employee: Employee;
  onSave: (editedEmployee: Employee) => void;
  onCancel: () => void;
}

const EmployeeDetails = ({
  employee,
  onSave,
  onCancel,
}: EmployeeDetailsProps) => {
  const today = new Date();
  const sixtyYearsAgo = subYears(today, 60);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),
    staffId: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "No special characters allowed")
      .required("Staff ID is required"),
    joiningDate: Yup.date()
      .max(today, "Joining date cannot be in the future")
      .min(sixtyYearsAgo, "Joining date cannot be more than 60 years ago")
      .required("Joining date is required"),
    basicSalary: Yup.number()
      .min(0, "Basic salary cannot be negative")
      .required("Basic salary is required"),
    allowances: Yup.number()
      .min(0, "Allowances cannot be negative")
      .required("Allowances are required"),
  });

  const handleSubmit = (values: Employee) => {
    onSave(values);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Employee
        </h2>
        <Formik
          initialValues={employee}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <Field
                type="text"
                name="name"
                className="form-input p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Staff Id:</label>
              <Field
                type="text"
                name="staffId"
                className="form-input mt-1 p-2  block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="staffId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Joining Date:</label>
              <Field
                type="date"
                name="joiningDate"
                className="form-input mt-1 p-2  block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="joiningDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Basic Salary:</label>
              <Field
                type="number"
                name="basicSalary"
                className="form-input mt-1 block p-2  w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="basicSalary"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Salary Allowances:</label>
              <Field
                type="number"
                name="allowances"
                className="form-input mt-1 block p-2  w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <ErrorMessage
                name="allowances"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeDetails;
