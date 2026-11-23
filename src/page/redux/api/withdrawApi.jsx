import { baseApi } from "./baseApi";

const withdrawApi = baseApi
  .enhanceEndpoints({ addTagTypes: ["wallet", "withdrawRequest"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // venue owner
      getWallet: builder.query({
        query: () => ({ url: "/withdraw-request/wallet", method: "GET" }),
        providesTags: ["wallet"],
      }),

      getMyWithdrawRequests: builder.query({
        query: ({ page = 1, limit = 10, status } = {}) => ({
          url: "/withdraw-request/my-requests",
          method: "GET",
          params: { page, limit, ...(status ? { status } : {}) },
        }),
        providesTags: ["withdrawRequest"],
      }),

      createWithdrawRequest: builder.mutation({
        query: (body) => ({
          url: "/withdraw-request/request",
          method: "POST",
          body,
        }),
        invalidatesTags: ["wallet", "withdrawRequest"],
      }),

      // admin
      getAllWithdrawRequests: builder.query({
        query: ({ page = 1, limit = 10, status, searchTerm } = {}) => ({
          url: "/withdraw-request/all",
          method: "GET",
          params: {
            page,
            limit,
            ...(status ? { status } : {}),
            ...(searchTerm ? { searchTerm } : {}),
          },
        }),
        providesTags: ["withdrawRequest"],
      }),

      approveWithdrawRequest: builder.mutation({
        query: (id) => ({
          url: `/withdraw-request/approve/${id}`,
          method: "PATCH",
        }),
        invalidatesTags: ["withdrawRequest"],
      }),

      rejectWithdrawRequest: builder.mutation({
        query: ({ id, reason }) => ({
          url: `/withdraw-request/reject/${id}`,
          method: "PATCH",
          body: { reason },
        }),
        invalidatesTags: ["withdrawRequest"],
      }),
    }),
  });

export const {
  useGetWalletQuery,
  useGetMyWithdrawRequestsQuery,
  useCreateWithdrawRequestMutation,
  useGetAllWithdrawRequestsQuery,
  useApproveWithdrawRequestMutation,
  useRejectWithdrawRequestMutation,
} = withdrawApi;
