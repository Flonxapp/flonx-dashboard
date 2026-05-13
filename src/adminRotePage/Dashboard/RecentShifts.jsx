import React from "react";
import { Table } from "antd";
import { LuEye } from "react-icons/lu";
import EyeIco from "../../components/icon/EyeIco";
import { Link } from "react-router-dom";
import { useGetSingleSupportAdminQuery } from "../../page/redux/api/admin/manageApiAdmin";



const RecentShifts = () => {
  const { data: supportData, isLoading } = useGetSingleSupportAdminQuery({
    page: 1,
    limit: 4,
  });


  const showModal2 = (record) => {
    console.log("View:", record);
  };

  // ✅ Transform API data → table format
  const tableData =
    supportData?.data?.result?.map((item, index) => ({
      key: item._id,
      no: (1 - 1) * 4 + index + 1,
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
    <div>
      <div className="flex pt-4 text-white justify-between items-center mb-4">
        <h1 className="text-xl font-semibold italic">Recent Help & Support</h1>
        <Link to={'/dashboard/HelpSupport'}>
          <button className="text-[#3D8BFF] font-medium">View All</button>
        </Link>
      </div>
  <Table
        dataSource={tableData}
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />
    </div>
  );
};

export default RecentShifts;