import React from 'react';
import Input from "./UI/input/input";
import Select from "./UI/select/select";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
      <Input
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder={'Поиск ...'}
        style={{marginBottom:'10px'}}
      />

      <Select
        defaultOption={'Сортировать по ..'}
        options={[
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'}
        ]}
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
      />
    </div>
  );
};

export default PostFilter;
