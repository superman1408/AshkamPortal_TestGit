import React, { useState } from "react";
import { Card } from "@mui/material";

const ComboBox = ({ posts, setCurrentId }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setCurrentId(value);
  };

  const formatName = (firstName, lastName) => {
    if (typeof firstName === "string" && typeof lastName === "string") {
      return (
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1).toLowerCase() +
        " " +
        lastName.charAt(0).toUpperCase() +
        lastName.slice(1).toLowerCase()
      );
    }
    return ""; // Return an empty string if firstName or lastName is not a string
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
        float: "left",
        marginTop: "10px",
        width: "200px",
        backgroundColor: "#f2f2f2",
        fontFamily: "Roboto",
        fontSize: "15px",
      }}
    >
      <option
        style={{ fontWeight: "bold", textAlign: "center", fontStyle: "italic" }}
        value=""
      >
        Select Employee
      </option>
      {sortedPosts.map((item, index) => {
        if (
          typeof item === "object" &&
          typeof item.firstName === "string" &&
          typeof item.lastName === "string"
        ) {
          return (
            <option key={index} value={item._id}>
              {formatName(item.firstName, item.lastName)}
            </option>
          );
        } else {
          return null;
        }
      })}
    </select>
  );
};

export default ComboBox;
