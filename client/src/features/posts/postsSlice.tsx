import { apiSlice } from "../api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    fetchAllPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Posts"]
    })
  }),
});

export const { useAddNewPostMutation, useFetchAllPostsQuery, useDeletePostMutation } = postsApiSlice;
