import { RiUserForbidLine } from "react-icons/ri";

import { HiOutlineUserGroup } from "react-icons/hi2";
import { VscNote } from "react-icons/vsc";
import { PiMoneyLight } from "react-icons/pi";
import CategoryIco from "../icon/CategoryIco";
import ProductIco from "../icon/ProductIco";
import ShiftsIco from "../icon/ShiftsIco";
import Activity from "./Activity";
import RecentShifts from "./RecentShifts";
import { useGetDahboardTotalQuery } from "../../page/redux/api/manageApi";
const Dashboard = () => {
    const {data:dashboardTotalData} = useGetDahboardTotalQuery()
  return (
    <div className=" font-nunito">
      <div className="grid grid-cols-3 gap-4">
        <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
         
          <div>
          
            <h1 className="text-2xl text-white italic "> Total Categories</h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] text-3xl font-extrabold italic font-nunito">{dashboardTotalData?.data?.totalCategories || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <CategoryIco color={'#822CE7'}></CategoryIco>
              </div>
            </div>
          </div>
        </div>
     <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
         
          <div>
          
            <h1 className=" text-2xl text-white italic "> Total Products</h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] text-3xl font-extrabold italic font-nunito">{dashboardTotalData?.data?.totalProducts || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <ProductIco color={'#822CE7'}/>
              </div>
            </div>
          </div>
        </div>
         <div className=" gap-4 items-center border border-[#822CE7] bg-[#822CE71A] p-6 rounded-xl shadow">
         
          <div>
          
            <h1 className=" text-2xl text-white italic font-nunito"> Trending items</h1>
            <div className="flex pt-5 justify-between items-center ">
              <h1 className="text-[#822CE7] text-3xl font-extrabold italic font-nunito">{dashboardTotalData?.data?.trendingItems || 0}</h1>
              <div className="bg-[#822CE71A] w-[40px] h-[40px] flex justify-center items-center rounded-lg">
                <ShiftsIco color={'#822CE7'}/>
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
