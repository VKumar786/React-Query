import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "MY NAME IS KHAN" },
  { id: 2, title: "when i grow up" },
];

const App = () => {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    retry: 4,
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject(new Error("Something went wrong")),
  });

  const newPostsMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => {
        POSTS.push({ id: 3, title });
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <div>Loading...</div>;
  if (postsQuery.isError)
    return <div>{JSON.stringify(postsQuery?.error?.message)}</div>;
  return (
    <div>
      {postsQuery.data.map((item, idx) => {
        return (
          <div key={idx}>
            {item.id} : {item.title}
          </div>
        );
      })}
      <button
        disabled={newPostsMutation.isLoading}
        onClick={() => newPostsMutation.mutate("random boii badmash")}
      >
        new posts
      </button>
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
