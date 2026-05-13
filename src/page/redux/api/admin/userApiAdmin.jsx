import { baseApi } from "../baseApi";

const useApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: "/user/user-profile",
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllUser: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: `/customer/get-all`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined, // 🔥 key part
        },
      }),
      providesTags: ["updateProfile"],
    }),
    getSingleUser: builder.query({
      query: ({ id }) => {
        return {
          url: `/customer/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


 getAllBartender: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: `/bartender/get-all`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined, // 🔥 key part
        },
      }),
      providesTags: ["updateProfile"],
    }),
    getSingleBartender: builder.query({
      query: ({ id }) => {
        return {
          url: `/bartender/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),






     getAllVenueOwner: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: `/venue-owner/get-all`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined, // 🔥 key part
        },
      }),
      providesTags: ["updateProfile"],
    }),
    getSingleVenueOwner: builder.query({
      query: ({ id }) => {
        return {
          url: `/venue-owner/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),





    userBlockUnblock: builder.mutation({
      query: (id) => {
        return {
          url: `/user/block-unblock/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/recovery-verification",
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "PUT",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => {
        return {
          url: "/user/update-profile",
          method: "PATCH",
          body: data,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/change-password",
          method: "PUT",
          body: data,
        };
      },
    }),
    getHostUser: builder.query({
      query: ({ user, page, search }) => {
        return {
          url: `/dashboard/get-all-user?role=${user}&page=${page}&searchTerm=${search}`,
          method: "GET",
        };
      },
      providesTags: ["host"],
    }),

    blockUserHost: builder.mutation({
      query: (data) => ({
        url: `/dashboard/block-unblock-user`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["host"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetHostUserQuery,
  useBlockUserHostMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUserBlockUnblockMutation,
  useGetAllBartenderQuery,
  useGetSingleBartenderQuery,
  useGetSingleVenueOwnerQuery,
  useGetAllVenueOwnerQuery
} = useApi;
