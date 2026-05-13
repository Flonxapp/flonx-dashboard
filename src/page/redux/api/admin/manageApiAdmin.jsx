import { baseApi } from "../baseApi";


const manageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDahboardTotalAdmin: builder.query({
      query: () => {
        return {
          url: "/meta/get-meta-data",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),


  getEarningsAdmin: builder.query({
      query: () => {
        return {
          url: "/meta/admin-earning",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getDahboardActivityAdmin: builder.query({
      query: ({ fram }) => {
        return {
          url: `meta/get-activities?frame=${fram}`,
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getTermsConditions: builder.query({
      query: () => {
        return {
          url: "/manage/get-terms-conditions",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),
    postTermsCondition: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-terms-conditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),




    getOrderAdmin: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/order/get-all-orders?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),


    getSupportAdmin: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/support/get-all?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getSingleSupportAdmin: builder.query({
      query: ({ id }) => {
        return {
          url: `/support/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    updateMark: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/support/update-status/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),

    getPrivecy: builder.query({
      query: () => {
        return {
          url: "/manage/get-privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),
    addLegalCompany: builder.mutation({
      query: (data) => {
        return {
          url: "/legal-info/add-update",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),
    getLegalCompany: builder.query({
      query: () => {
        return {
          url: "/legal-info/get",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    postPrivecy: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),

    // getAllProduct: builder.query({
    //   query: ({page,limit}) => {
    //     return {
    //       url: `/products?limit=${limit}&page=${page}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // getSubCategory: builder.query({
    //   query: ({id}) => {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // deleteProduct: builder.mutation({
    //   query: (data) => ({
    //     url: `/admin/products`,
    //     method: "DELETE",
    //     body: {id:data},
    //   }),
    //   invalidatesTags: ["updateProfile"],
    // }),

    // updateProduct: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `/admin/products`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // addProduct: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/admin/products",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    //  getAllNewHostUser: builder.query({
    //    query: () => {
    //      return {
    //        url: `/dashboard/get-all-add-car-req`,
    //        method: "GET",
    //      };
    //    },
    //    providesTags: ["host"],
    //  }),

    //  getSingleHostreq: builder.query({
    //    query: ({ carId }) => {
    //      return {
    //        url: `/car/get-single-car-details?carId=${carId}`,
    //        method: "GET",
    //      };
    //    },
    //    providesTags: ["newHost"],
    //  }),

    //  approveHostRequest: builder.mutation({
    //    query: ({ carId, status }) => {
    //      return {
    //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //        method: "PATCH",
    //      };
    //    },
    //    invalidatesTags: ["host"],
    //  }),

    //  caneleHostRequest: builder.mutation({
    //    query: ({ carId, status }) => {
    //      return {
    //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //        method: "PATCH",
    //      };
    //    },
    //    invalidatesTags: ["host"],
    //  }),

    // approveHostRequest: builder.mutation({
    //   query: ({ carId, status }) => {
    //     return {
    //       url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //       method: "PATCH",
    //     };

    //   },
    // }),
  }),
});

export const {
  useGetPrivecyQuery,
  useGetTermsConditionsQuery,
  usePostPrivecyMutation,
  usePostTermsConditionMutation,
useGetDahboardActivityAdminQuery,
useGetDahboardTotalAdminQuery,
  useGetSupportAdminQuery,
  useGetLegalCompanyQuery,
  useAddLegalCompanyMutation,
  useGetSingleSupportAdminQuery,
  useUpdateMarkMutation,
  useGetOrderAdminQuery,
  useGetEarningsAdminQuery,
} = manageApi;
