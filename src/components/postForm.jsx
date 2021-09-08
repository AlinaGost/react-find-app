import React, {useState} from 'react';
import Input from "./UI/input/input";
import Button from "./UI/button/button";

const PostForm = ({create}) => {
  let [post, setPost] = useState({title: '', body: ''});

  const addNewPost = (e) => {
    e.preventDefault();
   const newPost = {
     ...post,
     id: Date.now(),
   }
   create(newPost);
    setPost({title: '', body: ''});
  }
  return (
    <form>
      <Input type="text" placeholder={'Название поста'} value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
      <Input type="text" placeholder={'Описание поста'} value={post.body} onChange={(e) => setPost({...post, body: e.target.value})}/>
      <Button onClick={addNewPost}>Добавить пост</Button>
    </form>
  );
};

export default PostForm;
