"use client";

import React, { useState } from "react";
import { Pagination, Select, Table } from "antd";
import { Navigate } from "../../Navigate";
import HigherIco from "../../components/icon/HigherIco";
import EarningIco from "../../components/icon/EarningIco";
import { FaChevronDown } from "react-icons/fa";
import { useGetEarningsQuery, useGetOrderQuery } from "../redux/api/manageApi";

const { Option } = Select;

const Earning = () => {
  const [frame, setFrame] = useState("Last 24 Hours");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ================= API =================
  const { data: orderData, isLoading } = useGetOrderQuery({
    page: currentPage,
    limit: pageSize,
  });

  const {
    data: earningData,
    isLoading: isEarningLoading,
  } = useGetEarningsQuery({ frame });

  // ================= DATA =================
  const orders = orderData?.data?.result || [];
  const meta = orderData?.data?.meta;

  const totalEarning = earningData?.data?.earning?.total || 0;
  const changePercent = earningData?.data?.earning?.changePercent || 0;
  const isPositive = changePercent >= 0;

  // ================= HELPER =================
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

  // ================= TABLE =================
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="text-xs">{id}</span>,
    },
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status === "CANCELLED"
              ? "bg-red-500/20 text-red-400"
              : status === "QUEUED"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Order On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        new Date(date).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="p-3 h-[87vh] overflow-auto">

      {/* HEADER */}
      <div className="flex justify-between">
        <Navigate title={"Earning"} />
      </div>

      {/* EARNING CARD */}
      <div className="border border-[#2A2448] rounded-xl mb-5">

        {/* TOP BAR */}
        <div className="flex border-b px-3 py-3 border-[#2A2448] justify-between items-center">
          <h2 className="text-lg font-semibold italic text-gray-300">
            Showing activities for {frame}
          </h2>

          <Select
            className="custom-select -mt-2"
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

        {/* STATS */}
        <div className="flex px-5 py-4 justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <EarningIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">
                Total Earnings
              </p>

              {isEarningLoading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : (
                <p className="text-purple-400 text-lg font-semibold">
                  ${totalEarning}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              <HigherIco />
              {Math.abs(changePercent)}%
              <span className="text-gray-400 ml-2">
                {getChangeText(changePercent)}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <Table
        dataSource={orders}
        columns={columns}
        loading={isLoading}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* PAGINATION */}
      <div className="bg-[#822CE71A] w-full py-3 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

    </div>
  );
};

export default Earning;