import { baseApi } from "./baseApi";


const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStripe: builder.mutation({
      query: () => {
        return {
          url: "/stripe/create-onboarding-link",
          method: "POST",
        };
      },
      invalidatesTags: ["venue"],
    }),

   
updateStripe: builder.mutation({
      query: () => {
        return {
          url: "/stripe/update-connected-account",
          method: "POST",
        };
      },
      invalidatesTags: ["venue"],
    }),



  }),
});

export const {
useCreateStripeMutation,
useUpdateStripeMutation,
} = stripeApi;
