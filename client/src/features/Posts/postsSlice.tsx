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
    fetchUserPosts: builder.query({
      query: (id) => `/posts/userposts/${id}`,
      providesTags: ["Posts"]
    }),
    fetchAllPosts: builder.query({
      query: () => "/posts"
    }),
    deletePost: builder.mutation({
      query: ( id ) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Posts"]
    }),
    deletePhoto : builder.mutation({
      query: (id) => ({
        url: `/photos/removePhoto/${id}`,
        method:"DELETE"
      })
    })
  }),
});
export const { useAddNewPostMutation, useFetchAllPostsQuery, useDeletePostMutation, useDeletePhotoMutation, useFetchUserPostsQuery } = postsApiSlice;
