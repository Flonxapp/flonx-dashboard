import React from "react";
import { ShoppingBag, DollarSign, Package } from "lucide-react";
import HigherIco from "../icon/HigherIco";
import LowerIco from "../icon/LowerIco";
import ProductIco from "../icon/ProductIco";
import EarningIco from "../icon/EarningIco";
import { Select } from "antd";
import { FaChevronDown } from "react-icons/fa";
import { useGetDahboardActivityQuery } from "../../page/redux/api/manageApi";

const Activity = () => {
  const { data: dashboardActivity } = useGetDahboardActivityQuery();
  return (
    <div className="border border-[#2A2448] rounded-xl  mt-6">
      {/* Header */}
      <div className="flex border-b px-3 py-2 pb-4 border-[#2A2448] justify-between items-center">
        <h2 className="text-lg italic font-nunito pt-2 text-gray-300">
          Showing activities for Today
        </h2>

        <Select
          className="custom-select "
          placeholder="Select"
          dropdownClassName="custom-select-dropdown"
          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />} 
        >
          <Option value="all">All</Option>
          <Option value="snack">Requested</Option>
          <Option value="main-course">Ongoing</Option>
          <Option value="dessert">Upcoming</Option>
          <Option value="dessert">Completed</Option>
        </Select>
      </div>

      <div className="flex px-5 py-4 justify-between items-center">
        {/* Left Stats */}
        <div className="space-y-6">
          {/* Orders */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Total Orders</p>
              <p className="text-purple-400 text-lg font-semibold">113</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <EarningIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Total Earnings</p>
              <p className="text-purple-400 text-lg font-semibold">$ 1176</p>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Trending Items</p>
              <p className="text-purple-400 text-lg font-semibold">Mojito</p>
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="text-right space-y-10">
          <div
            className="text-green-400 flex items-center
            gap-1 text-sm font-medium"
          >
            <HigherIco></HigherIco> 5%{" "}
            <span className="text-gray-400 ml-2">Higher Than Yesterday</span>
          </div>

          <div
            className="text-red-400 flex items-center
            gap-1 text-sm font-medium"
          >
            <LowerIco></LowerIco> 5%{" "}
            <span className="text-gray-400 ml-2">Lower Than Yesterday</span>
          </div>

          <div className="text-purple-400 text-sm">
            16 <span className="text-gray-400">- Time Ordered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
