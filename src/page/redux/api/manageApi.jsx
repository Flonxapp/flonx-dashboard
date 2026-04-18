import { baseApi } from "./baseApi";

const manageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


getDahboardTotal: builder.query({
      query: () => {
        return {
          url: "/meta/venue-owner-meta-data",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    getDahboardActivity: builder.query({
      query: ({fram}) => {
        return {
          url: `/meta/get-venue-activities?frame=${fram}`,
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


 getPrivecy: builder.query({
      query: () => {
        return {
          url: "/manage/get-privacy-policy",
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
  useGetPrivecyQuery,useGetTermsConditionsQuery,usePostPrivecyMutation, usePostTermsConditionMutation, useGetDahboardTotalQuery,useGetDahboardActivityQuery
  

} = manageApi;