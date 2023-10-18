import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const POSTS = [];
/*
  onMutate -> will set context in onSuccess. it will run before mutationFn
*/
const CreatePost = () => {
  const [data, setData] = useState<DataType>({
    title: "",
    body: "",
  });

  const createPostMutate = useMutation({
    mutationFn: ({ title, body }: DataType) => {
      POSTS.push({
        title,
        body,
      });
    },
    // mutationFn: (var) => createPost(var);
    // mutationFn: createPost
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
    onError(error, variables, context) {
      console.log(data, variables, context);
    },
    onSettled(data, error, variables, context) {
      console.log(data, error, variables, context);
    },
    onMutate(variables) {
      return { hi: "bye" };
    },
  });

  // createPostMutate.mutateAsync().then(() => {});

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutate.mutate(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Enter title"
          value={data.title}
        />
        <input
          type="text"
          onChange={handleChange}
          name="body"
          placeholder="Enter Body"
          value={data.body}
        />
        <button type="submit">create</button>
      </form>
    </>
  );
};

type DataType = {
  title: string;
  body: string;
};

export default CreatePost;
