import { useQuery } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "MY NAME IS KHAN" },
  { id: 2, title: "when i grow up" },
];

/*
  /posts                -> ['posts']
  /posts/1              -> ['posts', 1] | ['posts', post.id]
  /posts?authorId=1     -> ['posts', { authorId: 1}]
  /posts/2/comments     -> ['posts', 1, 'comments'] | ['posts', post.id, 'comments']

  obj in queryFn: {queryKey}
*/

const App = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: (obj) => wait(1000).then(() => {
      console.log(obj);
      return [...POSTS];
    }),
    // queryFn: () => Promise.reject(new Error("Something went wrong")),
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
    </div>
  );
};

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export default App;
