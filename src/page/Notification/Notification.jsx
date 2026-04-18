import React, { useState } from "react";
import { Bell, Clock, Trash2 } from "lucide-react";
import { Navigate } from "../../Navigate";
import LogoIco from "../../components/icon/LogoIco";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "You have received a new order from John Doe.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Product Out of Stock",
      message: "Your product 'Red Hoodie' is now out of stock.",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "New Review Added",
      message: "A customer left a 5-star review on your product.",
      time: "3 hours ago",
    },
  ]);

  // Delete notification
  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className=" p-3 h-[87vh] overflow-auto">
      <Navigate title={"Notification"} />

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="border border-[#2A2448] rounded-lg p-3 hover:shadow-md transition duration-200"
          >
            <div className="flex items-center gap-3  justify-between">
             <div className="border border-[#2A2448] bg-[#822CE71A] w-[50px] h-[50px] rounded-xl flex items-center justify-center">
               <LogoIco></LogoIco>
             </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-white italic">{note.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {note.time}
                  </div>
                </div>
                <p className="text-gray-400">{note.message}</p>
              </div>

              <button
                onClick={() => handleDelete(note.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
                title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications found</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
