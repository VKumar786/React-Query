import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Random food things" },
  { id: 2, title: "there were something to do" },
  { id: 2, title: "there were something to yo" },
];

/*
  postQuery.fetchStatus == "fetching"
  postQuery.status == "loading"

  fetchStatus   =>  fetching  =>  idle    
  status        =>  loading   =>  success | error
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    staleTime: 1000,
  });
*/

const PostsList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    staleTime: 1000,
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

export default PostsList1;
