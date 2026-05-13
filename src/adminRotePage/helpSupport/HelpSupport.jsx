import React, { useState } from "react";
import { Pagination, Table } from "antd";
import { Navigate } from "../../Navigate";
import EyeIco from "../../components/icon/EyeIco";
import { Link } from "react-router-dom";
import { useGetSupportAdminQuery } from "../../page/redux/api/admin/manageApiAdmin";



const HelpSupport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ API CALL
  const { data: supportData, isLoading } = useGetSupportAdminQuery({
    page: currentPage,
    limit: pageSize,
  });

  // ✅ Transform API data → table format
  const tableData =
    supportData?.data?.result?.map((item, index) => ({
      key: item._id,
      no: (currentPage - 1) * pageSize + index + 1,
      name: item.userDetails?.name,
      email: item.userDetails?.email,
      contactReason: item.contactReason,
      message: item.message,
      status: item.status,
      createdAt: new Date(item.createdAt).toLocaleDateString(),
      image:
        item.userDetails?.profile_image ||
        "https://i.pravatar.cc/150",
    })) || [];

  // ✅ Table Columns
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "User Info",
      key: "user",
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
      key: "email",
    },
    {
      title: "Contact Reason",
      dataIndex: "contactReason",
      key: "contactReason",
    },
    {
      title: "Submitted On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span
          className={`px-3 py-1 italic rounded-full text-xs ${
            record.status === "RESOLVED"
              ? "bg-[#3D8BFF33] text-[#3D8BFF]"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end">
          <Link to={`/admin/dashboard/HelpSupport/details/${record.key}`}>
            <button className="w-[36px] h-[36px] bg-[#822CE71A] flex justify-center items-center text-[#22C55E] rounded">
              <EyeIco />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Help & Support"} />
      </div>

      {/* Table */}
      <Table
        dataSource={tableData}
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* Pagination */}
      <div className="bg-[#822CE71A] w-full py-3 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={supportData?.data?.meta?.total || 0}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default HelpSupport;
