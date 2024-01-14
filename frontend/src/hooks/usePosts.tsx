import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type NewPost = Omit<Post, "userId" | "id">;

const fetchPosts = async (): Promise<Post[]> => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.data);
};

const fetchPost = async (postId: string): Promise<Post> => {
  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.data);
};

const addPost = async (post: NewPost): Promise<Post> => {
  return await axios
    .post("https://jsonplaceholder.typicode.com/posts", post)
    .then((response) => response.data);
};

const updatePost = async (
  post: NewPost & { id: number | undefined }
): Promise<Post> => {
  return await axios
    .put(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
    .then((response) => response.data);
};

const deletePost = async (postId: number | undefined): Promise<Post> => {
  return await axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.data);
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });
};

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: [`post-${postId}`],
    queryFn: () => fetchPost(postId),
  });
};

export const useAddPost = (redirect: () => void) => {
  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: redirect,
  });

  return mutate;
};

export const useUpdatePost = () => {
  const { mutate } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => console.log("UPDATED !!!!"),
  });

  return mutate;
};

export const useDeletePost = (redirect: () => void) => {
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: redirect,
  });

  return mutate;
};
