import { Input, message, Pagination, Table } from "antd";
import { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import AddCategories from "./AddCategories";
import EditCategories from "./EditCategories";
import { Navigate } from "../../Navigate";
import { SearchOutlined } from "@ant-design/icons";
import AddIco from "../../components/icon/AddIco";
import EditIcon from "../../components/icon/EditIcon";
import { useDeleteCategoryMutation, useGetCategoryAllQuery } from "../redux/api/categoryApi";
import { handleDeleteConfirm } from "../../components/ConfirmDelete";

//rtt
const Categories = () => {


    const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
const { data: categoryData, isLoading, refetch } = useGetCategoryAllQuery({ page: currentPage,
    limit: pageSize,});
const [deleteCategoryData] = useDeleteCategoryMutation();


const handleDeleteCategory = (id) => {
  handleDeleteConfirm({
    title: "Delete Category!",
    content: "Are you sure you want to remove this category from the platform? This action cannot be undone.",
    onConfirm: async () => {
      try {
        const res = await deleteCategoryData(id).unwrap();
        message.success(res?.message || "Product deleted successfully");
        refetch();
      } catch (error) {
        message.error(error?.data?.message || "Delete failed");
      }
    },
  });
};
const categories = categoryData?.data?.result?.map((item) => ({
  _id: item._id,
  name: item.name,
  itemsUnder: item.totalProduct,
})) || [];
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);




  // ✏️ Edit Handler
  const handleEdit = (record) => {
    setSelectedCategory(record);
    setEditModal(true);
  };

  // 📝 Table Columns
  const columns = [
    {
      title: "SL No.",
      dataIndex: "sl",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + (index + 1),
    },
   
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Items Under",
      dataIndex: "itemsUnder",
      key: "itemsUnder",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex gap-2 justify-end">
          <div
            onClick={() => handleEdit(record)}
            className="w-[36px] h-[36px] text-lg bg-[#22C55E1A] flex justify-center items-center text-[#22C55E] rounded cursor-pointer"
          >
            <EditIcon></EditIcon>
          </div>
          <div
            onClick={() => handleDeleteCategory(record._id)}
            className="w-[36px] h-[36px] text-lg bg-[#EF44441A] flex justify-center items-center text-[#EF4444] rounded cursor-pointer"
          >
            <RiDeleteBin6Line />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className=" p-3 h-[87vh]">
      <div className="flex justify-between mb-4">
        <Navigate title={"Manage Categories"} />
        <div className="flex gap-5">
         
          <div>
            {" "}
            <button
              onClick={() => setOpenAddModal(true)}
              className="bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-lg flex items-center gap-3"
            >
             <AddIco/> Add New Category
            </button>
          </div>
        </div>
      </div>

 <Table
  dataSource={categories} // ✅ direct API data
  columns={columns}
  rowKey="_id"
  pagination={false}
  className="custom-table"
  scroll={{ x: "max-content" }}
  loading={isLoading}
/>
     <div className=" bg-[#822CE71A]   w-full z-10 py-3 rounded-b-xl flex justify-center">
            <Pagination
  current={currentPage}              // current page from state
  pageSize={pageSize}                // items per page
  total={categoryData?.data?.meta?.total || 0} // total items, NOT totalPages
  onChange={setCurrentPage}          // changes current page
  showSizeChanger={false}
/>
           </div>
     

      <AddCategories
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      />
      <EditCategories
        editModal={editModal}
        setEditModal={setEditModal}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Categories;