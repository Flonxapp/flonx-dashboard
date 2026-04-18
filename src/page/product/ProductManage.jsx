import React, { useState } from "react";
import { Input, message, Pagination, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Navigate } from "../../Navigate";
import AddIco from "../../components/icon/AddIco";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetMyVenueQuery, useGetProductAllQuery } from "../redux/api/productApi";
import { handleDeleteConfirm } from "../../components/ConfirmDelete";

const ProductManage = () => {
  const {data:venueProfile} = useGetMyVenueQuery()
  const [deleteProduct] = useDeleteProductMutation()
   const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const id = venueProfile?.data?._id
  console.log(id)
const { data: allProduct, refetch } = useGetProductAllQuery(
  { id, searchTerm, currentPage },
  { skip: !id }
);
  console.log(allProduct)
  const products = allProduct?.data?.result || [];

const tableData = products.map((item, index) => ({
  key: item._id,
  no: (currentPage - 1) * pageSize + index + 1,
  name: item.name,
  slogan: item.slogan,
  category: item.category?.name,
  price: `$${item.price}`,
  availability: item.isAvailable ? "Available" : "Out of Stock",
  image: item.image,
}));
const handleDelete = async (id) => {
 handleDeleteConfirm({
    title: "Delete Product!",
    content: "Are you sure you want to remove this Product from the platform? This action cannot be undone.",
    onConfirm: async () => {
      try {
        const res = await deleteProduct(id).unwrap();
      message.success(res?.message || "Product deleted successfully");
        refetch();
      } catch (error) {
        message.error(error?.data?.message || "Delete failed");
      }
    },
  });
};
 


const columns = [
  {
    title: "No",
    dataIndex: "no",
  },
  {
    title: "Product",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img
          src={record.image}
          className="w-10 h-10 object-cover rounded-md"
          alt="product"
        />
        <span>{record.name}</span>
      </div>
    ),
  },
  {
    title: "Slogan",
    dataIndex: "slogan",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Availability",
    render: (_, record) => (
      <span
        className={`px-3 py-1 rounded-full italic text-xs ${
          record.availability === "Available"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {record.availability}
      </span>
    ),
  },
  {
    title: "Action",
    align: "end",
    render: (_, record) => (
      <div className="flex justify-end gap-3 items-center">
        <Link to={`/dashboard/productManagement/details/${record.key}`}>
          <button className="w-[36px] h-[36px] bg-[#822CE71A] flex justify-center items-center text-[#822CE7] rounded">
            <LuEye />
          </button>
        </Link>

        <button
          onClick={() => handleDelete(record.key)}
          className="w-[36px] h-[36px] bg-[#EF44441A] flex justify-center items-center text-[#EF4444] rounded"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    ),
  },
];




  return (
    <div className="p-3 h-[87vh] overflow-auto">

      {/* Top Section */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Product Management"} />

        <div className="flex gap-4 items-center" >
          <Input
            placeholder="Search product..."
            onChange={(e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1);
}}
            className="custom-input" 
          />

          <div>
            <Link to="/dashboard/productManagement/add">
            <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-3">
            <AddIco /> Add New Product
          </button></Link>
          </div>
        </div>
      </div>

      {/* Table */}
    <Table
  dataSource={tableData}
  columns={columns}
  pagination={false}
  rowKey="key"
  className="custom-table"
/>

      {/* Pagination */}

      <div className=" bg-[#822CE71A]   w-full z-10 py-3 rounded-b-xl flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allProduct?.data?.meta?.total || 0}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

    </div>
  );
};

export default ProductManage;