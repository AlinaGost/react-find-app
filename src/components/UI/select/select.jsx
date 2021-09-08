import React from 'react';

const Select = ({options, defaultOption, value, onChange}) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled value="Сортировть по..">{defaultOption}</option>
      {options.map((el) => {
        return <option key={el.value} value={el.value}>{el.name}</option>
      })}
    </select>
  );
};

export default Select;
