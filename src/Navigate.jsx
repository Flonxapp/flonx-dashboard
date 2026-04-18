import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import ArrayLeft from './components/icon/ArrayLeft';
export const Navigate = ({title}) => {
    const navigate = useNavigate()
  return (
    <div className='font-montserrat'>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            onClick={() => navigate(-1)}
            className="flex gap-3 cursor-pointer"
          >
            <button className="border mt-[5px] text-sm w-5 h-5 rounded-full flex justify-center items-center text-white">
              <ArrayLeft></ArrayLeft>
            </button>
            <span className="text-lg text-white italic text-[16px]">{title}</span>
          </h1>
          
        </div>
    </div>
  )
}
