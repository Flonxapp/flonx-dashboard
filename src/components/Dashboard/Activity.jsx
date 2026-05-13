import React, { useState } from "react";
import { Select } from "antd";
import { FaChevronDown } from "react-icons/fa";

import HigherIco from "../icon/HigherIco";
import LowerIco from "../icon/LowerIco";
import ProductIco from "../icon/ProductIco";
import EarningIco from "../icon/EarningIco";

import { useGetDahboardActivityQuery } from "../../page/redux/api/manageApi";

const { Option } = Select;

const Activity = () => {
  const [frame, setFrame] = useState("Last 24 Hours");

  const { data: dashboardActivity } =
    useGetDahboardActivityQuery(frame);

  const activity = dashboardActivity?.data;

  const getChangeText = (percent) => {
    let periodText = "";

    switch (frame) {
      case "Last 24 Hours":
        periodText = "yesterday";
        break;
      case "Last Week":
        periodText = "last week";
        break;
      case "Last Fortnight":
        periodText = "last fortnight";
        break;
      case "Last Month":
        periodText = "last month";
        break;
      case "Last Year":
        periodText = "last year";
        break;
      default:
        periodText = "previous";
    }

    return percent >= 0
      ? `Higher than ${periodText}`
      : `Lower than ${periodText}`;
  };

  const totalOrders = activity?.totalOrders?.count ?? 0;
  const orderChange = activity?.totalOrders?.changePercent ?? 0;

  const totalEarnings = activity?.totalEarnings?.amount ?? 0;
  const earningChange = activity?.totalEarnings?.changePercent ?? 0;

  const trendingProducts = activity?.trendingProductsCount ?? 0;

  return (
    <div className="border border-[#2A2448] rounded-xl mt-6">

      {/* Header */}
      <div className="flex border-b px-3 py-2 pb-4 border-[#2A2448] justify-between items-center">
        <h2 className="text-lg italic font-nunito pt-2 text-gray-300">
          Showing activities for {frame}
        </h2>

        <Select
          className="custom-select -mt-2"
          placeholder="Select"
          value={frame}
          onChange={(value) => setFrame(value)}
          suffixIcon={
            <FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />
          }
        >
          <Option value="Last 24 Hours">Last 24 Hours</Option>
          <Option value="Last Week">Last Week</Option>
          <Option value="Last Fortnight">Last Fortnight</Option>
          <Option value="Last Month">Last Month</Option>
          <Option value="Last Year">Last Year</Option>
        </Select>
      </div>

      <div className="flex px-5 py-4 justify-between items-center">

        {/* Left Side */}
        <div className="space-y-6">

          {/* Orders */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Total Orders</p>
              <p className="text-purple-400 text-lg font-semibold">
                {totalOrders}
              </p>
            </div>
          </div>

          {/* Earnings */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <EarningIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Total Earnings</p>
              <p className="text-purple-400 text-lg font-semibold">
                $ {totalEarnings}
              </p>
            </div>
          </div>

          {/* Trending */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <ProductIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">
                Trending Products
              </p>
              <p className="text-purple-400 text-lg font-semibold">
                {trendingProducts}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-right space-y-10">

          {/* Orders Change */}
          <div className="flex items-center gap-1 text-sm font-medium">
            {orderChange >= 0 ? (
              <span className="text-green-400 flex items-center gap-1">
                <HigherIco /> {orderChange}%
              </span>
            ) : (
              <span className="text-red-400 flex items-center gap-1">
                <LowerIco /> {orderChange}%
              </span>
            )}

            <span className="text-gray-400 ml-2">
              {getChangeText(orderChange)}
            </span>
          </div>

          {/* Earnings Change */}
          <div className="flex items-center gap-1 text-sm font-medium">
            {earningChange >= 0 ? (
              <span className="text-green-400 flex items-center gap-1">
                <HigherIco /> {earningChange}%
              </span>
            ) : (
              <span className="text-red-400 flex items-center gap-1">
                <LowerIco /> {earningChange}%
              </span>
            )}

            <span className="text-gray-400 ml-2">
              {getChangeText(earningChange)}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Activity;