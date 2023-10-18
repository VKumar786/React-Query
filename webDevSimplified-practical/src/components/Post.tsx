import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Random food things" },
  { id: 2, title: "there were something to do" },
  { id: 2, title: "there were something to yo" },
];

const USERS = [
  { name: "vishal", age: 20 },
  { name: "papu", age: 21 },
];

const Post = ({ id }: PostType) => {
  const postsQuery = useQuery({
    queryKey: ["posts1"],
    queryFn: () =>
      wait(1000).then(() => POSTS.filter((item) => item.id === id)[0]),
    staleTime: 1000,
  });

  const userQuery = useQuery({
    queryKey: ["users", postsQuery?.data?.id],
    enabled: postsQuery?.data?.id !== null,
    queryFn: () => wait(1000).then(() => USERS[postsQuery?.data?.id]),
  });

  if (postsQuery.isLoading) return <div>Loading....</div>;
  if (postsQuery.isError)
    return <div>{JSON.stringify(postsQuery?.error?.message)}</div>;
  return (
    <>
      <h2>First Posts</h2>
      id: {postsQuery.data.id}, title: {postsQuery.data.title}
      <br />
      {userQuery.isLoading
        ? "Loading user data.."
        : userQuery.isError
        ? userQuery?.error?.message
        : userQuery.data.name}
    </>
  );
};

type PostType = {
  id: number;
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default Post;
