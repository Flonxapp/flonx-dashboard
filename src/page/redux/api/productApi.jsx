import { baseApi } from "./baseApi";

const product = baseApi.injectEndpoints({
  endpoints: (builder) => ({



    getProductAll: builder.query({
  query: ({ id, searchTerm, currentPage }) => ({
    url: `/product/venue-products/${id}`,
    method: "GET",
    params: {
      page: currentPage,
      limit: 10,
      searchTerm: searchTerm,
    },
  }),
  providesTags: ["product"],
}),

     getSingleProduct: builder.query({
      query: ({id}) => {
        return {
          url: `/product/single-product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
     deleteProduct :  builder.mutation({
        query : (id)=>{
            return {
                url : `/product/delete-product/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['updateProfile']
    }),


    updateProduct: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/product/update-product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

     getMyVenue: builder.query({
      query: () => {
        return {
          url: `/venue/my-venue`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


 updateVenueDetails: builder.mutation({
      query: ({id,data}) => {
        return {
          url: `/venue/update/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

     getSingleVenue: builder.query({
      query: ({id}) => {
        return {
          url: `/venue/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),


  }),

});

export const {
  useAddProductMutation,useGetMyVenueQuery, useDeleteProductMutation,useGetProductAllQuery,useUpdateProductMutation, useGetSingleProductQuery,useUpdateVenueDetailsMutation, useGetSingleVenueQuery
} = product;