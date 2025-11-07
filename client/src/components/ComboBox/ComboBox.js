// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getPosts } from "../../action/posts";

// const AbsentComboBox = ({ posts, setCurrentId }) => {
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const [selectedOption, setSelectedOption] = useState("");
//   const dispatch = useDispatch();

//   //  ✅ Fetch posts on component mount
//   useEffect(() => {
//     dispatch(getPosts());
//   }, []);

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSelectedOption(value);
//     setCurrentId(value);
//   };

//   const role = user?.result?.role;
//   const department = user?.result?.department;

//   const formatName = (firstName, lastName) => {
//     return (
//       firstName.charAt(0).toUpperCase() +
//       firstName.slice(1).toLowerCase() +
//       " " +
//       lastName.charAt(0).toUpperCase() +
//       lastName.slice(1).toLowerCase()
//     );
//   };

//   // const sortedPosts = [...posts].sort((a, b) => {
//   //   const nameA = formatName(a.firstName, a.lastName);
//   //   const nameB = formatName(b.firstName, b.lastName);
//   //   return nameA.localeCompare(nameB);
//   // });

//   const sortedPosts = [...posts]
//     .filter((post) => post.role?.toLowerCase() !== "admin") // exclude any case variation of "Admin"
//     .sort((a, b) => {
//       const nameA = formatName(a.firstName, a.lastName);
//       const nameB = formatName(b.firstName, b.lastName);
//       return nameA.localeCompare(nameB);
//     });

//   const currentUser = user?.result; // manager

//   const sortedDepartmentPosts = [...posts]
//     .filter((post) => post?.department === currentUser?.department) // exclude any case variation of "Admin"
//     .sort((a, b) => {
//       const nameA = formatName(a.firstName, a.lastName);
//       const nameB = formatName(b.firstName, b.lastName);
//       return nameA.localeCompare(nameB);
//     });

//   return (
//     <select
//       value={selectedOption}
//       onChange={handleChange}
//       style={{
//         color: "#16355d",
//         float: "right",
//         marginTop: "10px",
//         // marginLeft: "200px",
//         width: "200px",
//         backgroundColor: "#ffffffff",
//         fontFamily: "Roboto",
//         fontSize: "15px",
//       }}
//     >
//       <option
//         style={{ fontWeight: "bold", textAlign: "center", fontStyle: "italic" }}
//         value=""
//       >
//         Select Employee{" "}
//       </option>
//       {role === "manager" && department !== "Human Resource"
//         ? sortedDepartmentPosts.map((option, index) => (
//             <option key={index} value={option._id}>
//               {formatName(option.firstName, option.lastName)}
//             </option>
//           ))
//         : sortedPosts.map((option, index) => (
//             <option key={index} value={option._id}>
//               {formatName(option.firstName, option.lastName)}
//             </option>
//           ))}
//     </select>
//   );
// };

// export default AbsentComboBox;

import React, { useState } from "react";

const ComboBox = ({ posts, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;

    setSelectedOption(value);

    setCurrentId(value);
  };

  const role = user?.result?.role;

  const department = user?.result?.department;

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

    return "";
  };

  const filteredPosts = Array.isArray(posts)
    ? [...posts].filter((post) => post.role?.toLowerCase() !== "admin")
    : [];

  const sortedPosts = filteredPosts.sort((a, b) => {
    return formatName(a.firstName, a.lastName).localeCompare(
      formatName(b.firstName, b.lastName)
    );
  });

  const deptPosts = Array.isArray(posts)
    ? [...posts].filter((post) => post.department === department)
    : [];

  const sortedDeptPosts = deptPosts.sort((a, b) => {
    return formatName(a.firstName, a.lastName).localeCompare(
      formatName(b.firstName, b.lastName)
    );
  });

  const optionsToRender =
    role === "manager" && department !== "Human Resource"
      ? sortedDeptPosts
      : sortedPosts;

  return (
    <div style={{ display: "inline-block", width: "220px", marginTop: "10px" }}>
      <select
        value={selectedOption}
        onChange={handleChange}
        style={{
          width: "100%",

          padding: "8px 12px",

          fontFamily: "Roboto, sans-serif",

          fontSize: "15px",

          color: "#16355d",

          backgroundColor: "#ffffff",

          border: "1px solid #c0c4cc",

          borderRadius: "4px",

          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",

          appearance: "none",

          WebkitAppearance: "none",

          MozAppearance: "none",

          position: "relative",

          backgroundImage:
            "url(\"data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23635a5a' d='M2 0L0 2h4z'/></svg>\")",

          backgroundRepeat: "no-repeat",

          backgroundPosition: "right 10px center",

          backgroundSize: "8px 10px",
        }}
      >
        <option value="" disabled>
          Select Employee
        </option>

        {optionsToRender.map((opt, idx) => (
          <option key={idx} value={opt._id}>
            {formatName(opt.firstName, opt.lastName)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
