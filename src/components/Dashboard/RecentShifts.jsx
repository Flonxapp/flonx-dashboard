import React, { useState } from "react";
import { Input, Pagination, Select, Table } from "antd";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import EyeIco from "../../components/icon/EyeIco";
import { Link } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";
import { useGetAllShiftQuery } from "../../page/redux/api/manageShiftApi";

const { Option } = Select;

const RecentShifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(undefined);

  const pageSize = 10;

  // ✅ API CALL FIX
  const { data: manageShiftData } = useGetAllShiftQuery({
    page: 1,
    limit: 1000,
  });

  const shifts =
    manageShiftData?.data?.result?.slice(0, 5).map((item, index) => ({
      key: item._id,
      no: (currentPage - 1) * pageSize + index + 1,
      name: item?.bartender?.name,
      email: item?.bartender?.email,
      requestedOn: new Date(item?.createdAt).toLocaleDateString(),
      shiftDate: new Date(item?.startDateTime).toLocaleDateString(),
      status: item?.status,
      image:
        item?.bartender?.profile_image ||
        `https://i.pravatar.cc/150?img=${index + 10}`,
    })) || [];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Bartender",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt=""
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Requested On",
      dataIndex: "requestedOn",
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
    },
    {
      title: "Status",
      render: (_, record) => (
        <span
          className={`px-3 py-1 italic rounded-full text-xs ${
            record.status === "Approved"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end">
          <Link to={`/dashboard/ManageShifts/details/${record.key}`}>
            <button className="w-[36px] h-[36px] bg-[#22C55E1A] flex justify-center items-center text-[#22C55E] rounded">
              <EyeIco />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-5">
      {/* Top */}
      <h2 className="text-lg italic font-nunito pt-2 text-gray-300">
        Recent Shift
      </h2>

      {/* Table */}
      <Table
        dataSource={shifts}
        columns={columns}
        pagination={false}
        rowKey="key"
        className="custom-table"
      />

      {/* Pagination */}
    </div>
  );
};

export default RecentShifts;
