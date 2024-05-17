import React, { useState } from "react";
import { Card } from "@mui/material";

const ComboBox = ({ posts, setCurrentId }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setCurrentId(value);
  };

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
        Select Employee{" "}
      </option>
      {posts.map((item, index) => {
        if (
          typeof item === "object" &&
          "firstName" in item &&
          "lastName" in item
        ) {
          return (
            <option key={index} value={item._id}>
              {item.firstName.charAt(0).toUpperCase() +
                item.firstName.slice(1).toLowerCase() +
                " " +
                item.lastName.charAt(0).toUpperCase() +
                item.lastName.slice(1).toLowerCase()}
            </option>
          );
        } else {
          return null;
        }
      })}
    </select>
    // </Card>
  );
};

export default ComboBox;
