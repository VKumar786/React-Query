import { useState } from "react";
import PostsList1 from "./components/PostsList1";
import PostsList2 from "./components/PostsList2";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";

const App = () => {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  return (
    <>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Post List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Post List 2
      </button>
      {currentPage}

      <Post id={1} />

      <CreatePost />
    </>
  );
};

export default App;
