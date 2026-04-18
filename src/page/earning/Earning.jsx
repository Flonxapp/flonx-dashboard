import React, { useState } from "react";
import { Input, Pagination, Select, Table } from "antd";
import { LuEye } from "react-icons/lu";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import EyeIco from "../../components/icon/EyeIco";
import HigherIco from "../../components/icon/HigherIco";
import EarningIco from "../../components/icon/EarningIco";
import { FaChevronDown } from "react-icons/fa";

const Earning = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy Shift Data
  const dummyOrders = Array.from({ length: 25 }, (_, index) => ({
    key: index + 1,
    orderCode: `ORD-${1000 + index + 1}`,
    payOn: "12 Jun 2026",
    txnId: `TXN-${Math.floor(Math.random() * 1000000)}`,
    amount: `$${(Math.random() * 500 + 50).toFixed(2)}`,
  }));


 const columns = [
    {
      title: "Order Code",
      dataIndex: "orderCode",
      key: "orderCode",
    },
    {
      title: "Pay On",
      dataIndex: "payOn",
      key: "payOn",
    },
    {
      title: "Txn ID",
      dataIndex: "txnId",
      key: "txnId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];


  // Pagination
   const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedOrders = dummyOrders.slice(start, end);

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      {/* Top Section */}
      <div className="flex justify-between ">
        <Navigate title={"Earning"} />

        
      </div>

 <div className="border border-[#2A2448] rounded-xl  mb-5">
      
      {/* Header */}
      <div className="flex border-b px-3 py-2 border-[#2A2448] justify-between items-center">
        <h2 className="text-[16px] font-semibold italic text-gray-300">
          Earning Matrix
        </h2>

            <Select
          className="custom-select -mt-2"
          placeholder="Select User"
          dropdownClassName="custom-select-dropdown"
          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm mt-2" />} // Optional: Remove default icon if you want a custom one
        >
          <Option value="all">Today</Option>
          <Option value="snack">Yesterday</Option>
          <Option value="main-course">This Week</Option>
          

     
        </Select>
      </div>

      <div className="flex px-5 py-4 justify-between items-center">
        
        {/* Left Stats */}
        <div className="">

          {/* Orders */}
      

          {/* Earnings */}
          <div className="flex items-center gap-4">
            <div className="bg-[#1a1238] p-3 rounded-xl">
              <EarningIco color={"#822CE7"} />
            </div>

            <div>
              <p className="text-gray-400 text-sm italic">Showing Earnings for Today</p>
              <p className="text-purple-400 text-lg font-semibold">$ 1176</p>
            </div>
          </div>

          {/* Trending */}
          

        </div>

        {/* Right Stats */}
        <div className="text-right space-y-10">

          <div className="text-green-400 flex items-center
            gap-1 text-sm font-medium">
            <HigherIco></HigherIco> 5% <span className="text-gray-400 ml-2">Higher Than Yesterday</span>
          </div>

         

        </div>

      </div>
    </div>



      {/* Table */}
       <Table
        dataSource={paginatedOrders}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
      />

      {/* Pagination */}
    
    </div>
  );
};

export default Earning;
