import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../action/posts"; // adjust the import path if needed

const ComboBox = ({ posts, setCurrentId }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  //  ✅ Fetch posts on component mount
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setCurrentId(value);
  };

  const formatName = (firstName, lastName) => {
    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1).toLowerCase() +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase()
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const nameA = formatName(a.firstName, a.lastName);
    const nameB = formatName(b.firstName, b.lastName);
    return nameA.localeCompare(nameB);
  });

  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      style={{
        color: "#16355d",
        float: "right",
        marginTop: "10px",
        width: "200px",
        backgroundColor: "#ffffffff",
        fontFamily: "Roboto",
        fontSize: "15px",
      }}
    >
      <option
        style={{ fontWeight: "bold", textAlign: "center", fontStyle: "italic" }}
        value=""
      >
        Select Employee{" "}
      </option>
      {sortedPosts.map((option, index) => (
        <option key={index} value={option._id}>
          {formatName(option.firstName, option.lastName)}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
