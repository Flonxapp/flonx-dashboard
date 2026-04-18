import React, { useState } from "react";
import { Input, Pagination, Select, Table } from "antd";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import EyeIco from "../../components/icon/EyeIco";
import { Link } from "react-router-dom";
import { useGetAllShiftQuery } from "../redux/api/manageShiftApi";
import { FaChevronDown } from "react-icons/fa";

const { Option } = Select;

const ManageShifts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(undefined);

  const pageSize = 10;

  // ✅ API CALL FIX
  const { data: manageShiftData } = useGetAllShiftQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
    status, // undefined hole jabe na
  });

  const shifts =
    manageShiftData?.data?.result?.map((item, index) => ({
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
    <div className="p-3 h-[87vh] overflow-auto">
      {/* Top */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Manage Shifts"} />

        <div className="flex gap-2 items-center">
          {/* 🔍 Search */}
          <Input
            placeholder="Search bartender..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="custom-input"
          />

          {/* 🔽 Status Filter */}
          <Select
            className="custom-select -mt-2"
            placeholder="Select Status"
            dropdownClassName="custom-select-dropdown"
            suffixIcon={
              <FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />
            }
            allowClear
            onChange={(value) => {
              if (!value || value === "all") {
                setStatus(undefined); // 🔥 nothing sent
              } else {
                setStatus(value);
              }
              setCurrentPage(1);
            }}
          >
            <Option value="all">All</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Upcoming">Upcoming</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Active">Active</Option>
            <Option value="Rejected">Rejected</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>

          <Link to="/dashboard/ManageShifts/find_bartender">
            <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white px-3 py-2 rounded-lg flex items-center gap-3">
              <AddIco /> Find Bartender
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <Table
        dataSource={shifts}
        columns={columns}
        pagination={false}
        rowKey="key"
        className="custom-table"
      />

      {/* Pagination */}
      <div className="bg-[#822CE71A] w-full py-3 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={manageShiftData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default ManageShifts;
