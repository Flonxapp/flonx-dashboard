import { useEffect, useState } from "react";
import { Clock, Trash2 } from "lucide-react";
import { Pagination, message } from "antd";
import { Navigate } from "../../Navigate";
import LogoIco from "../icon/LogoIco";
import PageLoader from "../PageLoader";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
} from "../../page/redux/api/notificationApi";

const PAGE_SIZE = 20;

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (Number.isNaN(seconds)) return "";
  if (seconds < 60) return "just now";
  const units = [
    [60 * 60 * 24 * 365, "year"],
    [60 * 60 * 24 * 30, "month"],
    [60 * 60 * 24, "day"],
    [60 * 60, "hour"],
    [60, "min"],
  ];
  for (const [size, label] of units) {
    const n = Math.floor(seconds / size);
    if (n >= 1) return `${n} ${label}${n > 1 && label !== "min" ? "s" : ""} ago`;
  }
  return "";
};

// Real notifications for the logged-in venue owner or admin
const NotificationList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery({
    page,
    limit: PAGE_SIZE,
  });
  const [seeAll] = useSeeNotificationsMutation();
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();

  const notifications = data?.data?.result || [];
  const total = data?.data?.meta?.total || 0;
  const unread = data?.data?.meta?.unreadCount || 0;

  // opening the page marks everything as seen (clears the bell badge)
  useEffect(() => {
    if (unread > 0) seeAll();
  }, [unread, seeAll]);

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id).unwrap();
    } catch (err) {
      message.error(err?.data?.message || "Could not delete notification");
    }
  };

  return (
    <div className=" p-3 h-[87vh] overflow-auto">
      <Navigate title={"Notification"} />

      {isLoading ? (
        <PageLoader />
      ) : isError ? (
        <p className="text-center text-red-400">
          Could not load notifications.{" "}
          <button className="underline" onClick={refetch}>
            Retry
          </button>
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.map((note) => (
            <div
              key={note._id}
              className={`border rounded-lg p-3 hover:shadow-md transition duration-200 ${
                note.isRead ? "border-[#2A2448]" : "border-[#822CE7]"
              }`}
            >
              <div className="flex items-center gap-3  justify-between">
                <div className="border border-[#2A2448] bg-[#822CE71A] w-[50px] h-[50px] rounded-xl flex items-center justify-center">
                  <LogoIco></LogoIco>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-white italic">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {timeAgo(note.createdAt)}
                    </div>
                  </div>
                  <p className="text-gray-400">{note.message}</p>
                </div>

                <button
                  onClick={() => handleDelete(note._id)}
                  disabled={isDeleting}
                  className="ml-4 text-red-500 hover:text-red-700 transition disabled:opacity-50"
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

          {total > PAGE_SIZE && (
            <div className="flex justify-center">
              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={total}
                onChange={setPage}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
