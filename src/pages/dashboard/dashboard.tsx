import {
  CalendarDaysIcon,
  CalendarIcon,
  ChartBarSquareIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import Layout from "../../layouts/layout";
import Chart from "../../components/chart/chart";

const Dashboard = () => {

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex bg-gray-100 p-5 items-center justify-between">
          <h2 className="text-xl">Payroll overview</h2>
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full flex items-center">
              <PlusCircleIcon className="h-4 w-4 mr-3" />
              Add Staff
            </button>
            <UserCircleIcon className="h-12 w-12 text-gray-500 rounded-full ml-4" />
          </div>
        </div>

        <div className="flex">
          <Chart />

          {/* <div className="flex flex-col mt-5 mx-5 justify-around">
            <div className="bg-blue-500 text-white shadow-lg rounded-lg p-4">
              <div className="flex items-center">
                <div className="mr-2">
                  <CalendarIcon className="w-7 h-7 p-2 rounded-full bg-[#5392F8]" />
                </div>
                <h2 className="text-sm">Upcoming salary date</h2>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <p>
                    <span className="font-bold">April 5th,</span>
                    <span className="text-xs">2024</span>
                  </p>
                  <small className="text-xs">In 4 days times</small>
                </div>
                <ChartBarSquareIcon className="h-10 w-10 ml-auto" />
              </div>
            </div>

            <div className="bg-white text-black shadow-lg rounded-lg p-4">
              <div className="flex items-center">
                <div className="mr-2">
                  <CalendarIcon className="w-7 h-7 p-2 rounded-full bg-[#EAF2FF]" />
                </div>
                <h2 className="text-sm">Upcoming salary amount</h2>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <p>
                    <span className="font-bold">$1,200,000.</span>
                    <span className="text-xs">00</span>
                  </p>
                  <small className="text-xs">4124 Employees</small>
                </div>
                <CalendarDaysIcon className="h-10 w-10 ml-auto" />
              </div>
            </div>
        </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
