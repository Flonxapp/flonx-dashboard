


import Image1 from '../../assets/header/image.png'
import { Navigate } from '../../Navigate';

const VenueDetails = () => {
  
  return (
    <div className="px-4 pt-6 pb-11 text-white">
      <div className="flex items-center">
      <Navigate></Navigate>
        <h1 className="text-[16px] italic text-white font-montserrat">Venue Details</h1>
        
      </div>

      <div className=" py-4">
        <img
          className="w-[90px] h-[90px] object-cover rounded-2xl"
          src={Image1}
          alt={"Logo"}      
        />
      </div>
      <div>
        <div className=" bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Venue Name</h1>
          <p>Midnight Lounge</p>
        </div>

        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Owner Name</h1>
          <p>Midnight Lounge</p>
        </div>

        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Contact Email</h1>
          <p>foisalrk2@gmail.com</p>
        </div>

         <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Contact Number</h1>
          <p>+88324324342</p>
        </div>

        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Venue Address</h1>
          <p>123 Main Street, Austin, TX 78701</p>
        </div>
     
      </div>
    </div>
  );
};

export default VenueDetails;
