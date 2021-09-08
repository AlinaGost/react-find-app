import React from 'react';
import Button from "./UI/button/button";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post_content">
        <strong>{props.number}. {props.post.title}</strong>
        <div>
          {props.post.body}
        </div>
      </div>
      <Button onClick={() => props.remove(props.post)} className="post_btn">Удалить</Button>
    </div>
  );
};

export default PostItem;
