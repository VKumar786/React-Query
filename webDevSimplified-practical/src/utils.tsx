import axios from "axios";

export function createPost({ title, body }: { title: string; body: string }) {
  return axios
    .post("http://localhost:3000/posts", {
      title,
      body,
    })
    .then((res) => res.data);
}
