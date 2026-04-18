import { baseApi } from "./baseApi";

const support = baseApi.injectEndpoints({
  endpoints: (builder) => ({



    createSupport: builder.mutation({
      query: (data) => {
        return {
          url: "/support/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["support"],
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
  useCreateSupportMutation,useGetTermsConditionsQuery,usePostPrivecyMutation, usePostTermsConditionMutation, useGetDahboardTotalQuery,useGetDahboardActivityQuery
  

} = support;