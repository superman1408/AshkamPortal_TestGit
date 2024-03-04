import React, { useState } from 'react';

const ComboBox = ({ posts, setCurrentId }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setCurrentId(value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      <option value="">Select Employee ...</option>
      {posts.map((option, index) => (
        <option key={index} value={option._id}>{option.firstName}</option>
      ))}
    </select>
  );
};

export default ComboBox;