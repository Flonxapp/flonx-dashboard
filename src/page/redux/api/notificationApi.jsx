import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, limit = 20 } = {}) => ({
        url: "/notification/get-notifications",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["notification"],
    }),
    // marks all as seen (clears the unread badge)
    seeNotifications: builder.mutation({
      query: () => ({ url: "/notification/see-notifications", method: "PATCH" }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({ url: `/notification/delete/${id}`, method: "DELETE" }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useSeeNotificationsMutation,
  useDeleteNotificationMutation,
} = notificationApi;
