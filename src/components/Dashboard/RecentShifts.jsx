import React from "react";
import { Table } from "antd";
import { LuEye } from "react-icons/lu";
import EyeIco from "../icon/EyeIco";
import { Link } from "react-router-dom";

const RecentShifts = () => {

  const showModal2 = (record) => {
    console.log("View:", record);
  };

  const paginatedUsers = [
    {
      key: 1,
      no: 1,
      name: "John Doe",
      email: "john@example.com",
      image: "https://i.pravatar.cc/100?img=1",
      requestedOn: "12 Jun 2026",
      shiftDate: "15 Jun 2026",
      status: "Completed",
    },
    {
      key: 2,
      no: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      image: "https://i.pravatar.cc/100?img=2",
      requestedOn: "10 Jun 2026",
      shiftDate: "14 Jun 2026",
      status: "Completed",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Bartender",
      key: "bartender",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="w-10 h-10 object-cover rounded-full"
            alt="Bartender"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Requested On",
      dataIndex: "requestedOn",
      key: "requestedOn",
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-3 py-1 rounded-full italic text-sm ${
            record.status === "Approved"
              ? "bg-[#3D8BFF33] text-[#3D8BFF]"
              : "bg-[#3D8BFF33] text-[#3D8BFF]"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/dashboard/ManageShifts/details/${record.key}`}>
          <button
            className="text-xl text-blue-500"
            onClick={() => showModal2(record)}
          >
            <EyeIco />
        </button></Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex pt-4 text-white justify-between items-center mb-4">
        <h1 className="text-xl font-semibold font-nunito italic">Recent Shifts</h1>
       <Link to={'/dashboard/ManageShifts'}>
        <button className="text-[#3D8BFF] font-medium">View All</button></Link>
      </div>

      <Table
        dataSource={paginatedUsers}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="key"
        className="custom-table"
      />
    </div>
  );
};

export default RecentShifts;