import { baseApi } from "./baseApi";

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

    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user/register-user",
          method: "POST",
          body: data,
        };
      },
    }),

    addVenue: builder.mutation({
      query: (data) => {
        return {
          url: "/venue/add-venue",
          method: "POST",
          body: data,
        };
      },
    }),

    resentVerify: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/resend-reset-code",
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
    forgotPassword: builder.mutation({
      query: (email) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: email,
        };
      },
    }),
    registerVerify: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/verify-reset-otp",
          method: "POST",
          body: data,
        };
      },
    }),

registerVerifyUser: builder.mutation({
      query: (data) => {
        return {
          url: "/user/verify-code",
          method: "POST",
          body: data,
        };
      },
    }),


    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({data}) => {
        return {
          url: "/user/update-profile",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
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
  useRegisterVerifyMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetHostUserQuery,
  useBlockUserHostMutation,
  useRegisterUserMutation,
  useResentVerifyMutation,
  useAddVenueMutation,
  useRegisterVerifyUserMutation,
} = useApi;
