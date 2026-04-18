import React from "react";
import { Navigate } from "../../Navigate";
import { FiEye, FiDownload } from "react-icons/fi";
import QRCode from "react-qr-code"; // optional if you want dynamic QR
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/api/productApi";

const ProductDetails = () => {
  const {id} = useParams()
  const {data:productDetails} = useGetSingleProductQuery({id})
  console.log(productDetails)
  const product = productDetails?.data;

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <Navigate title="Manage Product" />
<div className="flex items-center gap-4">
  <img
    src={product?.image}
    alt="Product"
    className="w-20 h-20 object-cover rounded-lg"
  />
</div>
      {/* Venue Details */}
      <div className="mt-6 border text-white border-[#2A2448] rounded-xl  space-y-3">
      <div className="border-b italic border-[#2A2448] p-3">
        <h1>Product Details </h1>
      </div>

       <div className="grid p-3 grid-cols-2 gap-4 text-sm">
  <div>
    <p className="text-gray-400 italic">Product Name</p>
    <p>{product?.name}</p>
  </div>

  <div>
    <p className="text-gray-400 italic">Category Name</p>
    <p>{product?.category?.name}</p>
  </div>

  <div>
    <p className="text-gray-400 italic">Availability</p>
    <button
      className={`px-2 mt-1 italic rounded-full ${
        product?.isAvailable
          ? "bg-[#22C55E33] text-[#22C55E]"
          : "bg-[#EF444433] text-[#EF4444]"
      }`}
    >
      {product?.isAvailable ? "Available" : "Out of Stock"}
    </button>
  </div>

  <div>
    <p className="text-gray-400 italic">Slogan</p>
    <p>{product?.slogan}</p>
  </div>

  <div>
    <p className="text-gray-400 italic">Stock</p>
    <p>{product?.stock}</p>
  </div>

  <div>
    <p className="text-gray-400 italic">Price</p>
    <p>${product?.price}</p>
  </div>

  <div className="col-span-2">
    <p className="text-gray-400 italic">Description</p>
    <p>{product?.description}</p>
  </div>

  <div className="col-span-2">
    <p className="text-gray-400 italic">Tags</p>
    <div className="flex gap-2 flex-wrap">
      {product?.tags?.map((tag, index) => (
        <span
          key={index}
          className="bg-[#822CE71A] text-[#BB82FF] px-2 py-1 rounded text-xs"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
</div>
      </div>



      {/* Update Details Button */}
      <div className="mt-6">
        <Link to={`/dashboard/productManagement/edit/${product?._id}`}>
          <button className="bg-gradient-to-tr w-[185px] from-[#822CE7] to-[#BB82FF] text-white shadow-md px-3 py-2 rounded-full">
            Edit Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;