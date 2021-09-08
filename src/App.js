import React, {useEffect, useState} from 'react';
import './styles/app.css';
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import PostFilter from "./components/postFilter";
import Modal from "./components/UI/modal/modal";
import Button from "./components/UI/button/button";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";


function App() {
  const [posts, setPosts] = useState([
    // {id: 1, title: "JavaScript", body: "JavaScript - язык программирования!"},
    // {id: 2, title: "HTML", body: "Разметка веб-страницы"},
    // {id: 3, title: "CSS", body: "Каскадная таблица стилей"}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);


  useEffect(() => {
    fetchPosts();
  }, []);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);
    setIsPostsLoading(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="app">
      <button onClick={fetchPosts}>GET POSTS</button>
      <Button style={{marginTop:'30px'}} onClick={() => setModal(true)}>
        Создать пост
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </Modal>

      <hr style={{margin:'20px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading
      ? <h1 style={{textAlign:'center'}}>Идет загрузка ...</h1>
      : <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'}/>
      }

    </div>
  );
}

export default App;
