import React, {useEffect, useState} from 'react';
import './styles/app.css';
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import PostFilter from "./components/postFilter";
import Modal from "./components/UI/modal/modal";
import Button from "./components/UI/button/button";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/loader";
import {useFetching} from "./hooks/useFetching";
import {getPageCount, getPagesArray} from "./utils/pages";


function App() {
  const [posts, setPosts] = useState([
    // {id: 1, title: "JavaScript", body: "JavaScript - язык программирования!"},
    // {id: 2, title: "HTML", body: "Разметка веб-страницы"},
    // {id: 3, title: "CSS", body: "Каскадная таблица стилей"}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError ] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });


  useEffect(() => {
    fetchPosts();
  }, []);

  function createPost(newPost) {
    setPosts([...posts, newPost]);
    setModal(false);
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

      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }

      {isPostsLoading
      ? <div style={{display:'flex', justifyContent:'center', marginTop:'100px'}}><Loader/></div>
      : <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'}/>
      }

      <div className='page_wrapper'>
        {pagesArray.map(p =>
          <span
            onClick={() => setPage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}
          >
            {p}
          </span>
        )}
      </div>


    </div>
  );
}

export default App;
