import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryAll: builder.query({
      query: ({ page, limit } = {}) => {
        // start with base URL
        let url = "/category/all-categories";

        // add query params only if they exist
        const params = [];
        if (page !== undefined) params.push(`page=${page}`);
        if (limit !== undefined) params.push(`limit=${limit}`);

        if (params.length) {
          url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),



       getVenueCategoryAll: builder.query({
      query: ({ page, limit , id} = {}) => {
        // start with base URL
        let url = `/category/venue-categories/${id}`;

        // add query params only if they exist
        const params = [];
        if (page !== undefined) params.push(`page=${page}`);
        if (limit !== undefined) params.push(`limit=${limit}`);

        if (params.length) {
          url += `?${params.join("&")}`;
        }

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category/create-category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/delete-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/category/update-category/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
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
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryAllQuery,
  useUpdateCategoryMutation,
  useGetVenueCategoryAllQuery,
} = category;
