import React, {useMemo, useState} from 'react';
import './styles/app.css';
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import PostFilter from "./components/postFilter";
import Modal from "./components/UI/modal/modal";
import Button from "./components/UI/button/button";


function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: "JavaScript", body: "JavaScript - язык программирования!"},
    {id: 2, title: "HTML", body: "Разметка веб-страницы"},
    {id: 3, title: "CSS", body: "Каскадная таблица стилей"}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo(() => {
    console.log('функция вызвалась');
    if(filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query) || post.body.toLowerCase().includes(filter.query) );
  }, [filter.query, sortedPosts])

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="app">
      <Button style={{marginTop:'30px'}} onClick={() => setModal(true)}>
        Создать пост
      </Button>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </Modal>

      <hr style={{margin:'20px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'}/>

    </div>
  );
}

export default App;
