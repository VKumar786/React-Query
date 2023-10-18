import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "MY NAME IS KHAN" },
  { id: 2, title: "when i grow up" },
];

const PostsList2 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  if (postsQuery.isLoading) return <div>Loading...</div>;
  if (postsQuery.isError)
    return <div>{JSON.stringify(postsQuery?.error?.message)}</div>;
  return (
    <div>
      <h1>Post List 1</h1>
      {postsQuery.data.map((item, idx) => {
        return (
          <div key={idx}>
            {item.id} : {item.title}
          </div>
        );
      })}
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default PostsList2;
