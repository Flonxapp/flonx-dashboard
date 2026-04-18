import { baseApi } from "./baseApi";

const manageShift = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBartender: builder.query({
      query: ({ searchTerm, page, limit, lat, lng, maxDistance }) => ({
        url: `/bartender/get-all`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          lat: lat || undefined,
          lng: lng || undefined,
          maxDistance: maxDistance ||5,
        },
      }),
      providesTags: ["bartender"],
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

    addShiftRequest: builder.mutation({
      query: (data) => {
        return {
          url: "/shift/send-request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getAllShift: builder.query({
      query: ({ searchTerm, page, limit, status }) => ({
        url: `/shift/my-shift`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status: status || undefined, // 🔥 key part
        },
      }),
      providesTags: ["shift"],
    }),

    updateShiftRequest: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/shift/accept-reject/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useAddShiftRequestMutation,
  useGetAllBartenderQuery,
  useGetAllShiftQuery,
  useGetSingleBartenderQuery,
  useUpdateShiftRequestMutation,
} = manageShift;
