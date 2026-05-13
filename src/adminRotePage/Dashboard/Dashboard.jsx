import { RiUserForbidLine } from "react-icons/ri";

import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscNote } from "react-icons/vsc";
import { PiMoneyLight } from "react-icons/pi";
import CategoryIco from "../../components/icon/CategoryIco";
import ProductIco from "../../components/icon/ProductIco";
import ShiftsIco from "../../components/icon/ShiftsIco";
import Activity from "./Activity";
import RecentShifts from "./RecentShifts";
import { useGetDahboardTotalAdminQuery } from "../../page/redux/api/admin/manageApiAdmin";


const Dashboard = () => {
  const {data:dashboardTotalData} = useGetDahboardTotalAdminQuery()
  console.log(dashboardTotalData)
  return (
    <div className=" ">
      <div className="grid grid-cols-3 gap-4">
        <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
          <div>
            <h1 className="font-semibold text-2xl text-white italic">
              {" "}
              Total User
            </h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] font-bold text-3xl italic ">{dashboardTotalData?.data?.totalCustomers || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <CategoryIco color={"#822CE7"}></CategoryIco>
              </div>
            </div>
          </div>
        </div>
        <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
          <div>
            <h1 className="font-semibold text-2xl text-white italic">
              {" "}
              Total Bartenders
            </h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] text-3xl font-bold italic">{dashboardTotalData?.data?.totalBartenders || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <ProductIco color={"#822CE7"} />
              </div>
            </div>
          </div>
        </div>
        <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
          <div>
            <h1 className="font-semibold text-2xl text-white italic">
              {" "}
              Total Venue Owners
            </h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] text-3xl font-bold italic">{dashboardTotalData?.data?.totalVenueOwners || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <ShiftsIco color={"#822CE7"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Activity></Activity>
        <RecentShifts></RecentShifts>
      </div>
    </div>
  );
};

export default Dashboard;
