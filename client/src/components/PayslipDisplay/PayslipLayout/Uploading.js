// import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// import { Card, Grid, Typography } from "@mui/material";

// import { salarySlipData } from "../../../action/posts";
// import ComboBox from "../../ComboBox/ComboBox";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
// import TitlePopup from "./TitlePopup";
// import LoadingSpinner from "../../ReactSpinner/reactSpinner";

// const Uploading = ({ posts, currentId, setCurrentId }) => {
//   const dispatch = useDispatch();
//   const [selectedFile, setSelectedFile] = useState(null); // Change to null
//   const [title, setTitle] = useState(null);

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [titleOpen, setTitleOpen] = useState(false);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]); // Set selected file directly
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const togglePopup = () => {
//     setTitleOpen(!titleOpen);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true); // Start loading
//     if (currentId && selectedFile) {
//       const MAX_FILE_SIZE_MB = 5; // Limit to 5 MB
//       const fileSizeInMB = selectedFile.size / (1024 * 1024); // convert bytes to MB

//       if (fileSizeInMB > MAX_FILE_SIZE_MB) {
//         alert(
//           `⚠️ File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`
//         );
//         setIsSubmitting(false);
//         return;
//       }
//       const formData = new FormData();
//       formData.append("pdf", selectedFile);
//       formData.append("title", title);

//       try {
//         await dispatch(
//           salarySlipData(currentId, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//         );

//         alert("✅ Salary slip uploaded successfully.");
//         setIsSubmitting(false); // Stop loading
//         // Refresh the page
//         window.location.reload();
//       } catch (err) {
//         console.log(err);
//       }
//     } else {
//       console.log("Current ID or file not set");
//     }
//   };

//   return (
//     <>
//       <Grid item xs={12} md={12}>
//         <Card
//           sx={{
//             padding: "2px",
//             // "@media(max-Width:600px)": { width: "40vh", margin: "0px" },
//           }}
//         >
//           <Grid
//             sx={{
//               display: "flex",
//               flexWrap: "wrap",
//               flexDirection: { xs: "column", sm: "row" }, // this is the correct way
//               justifyContent: "space-evenly",
//               gap: "30px",
//               padding: "30px",
//             }}
//           >
//             <Grid>
//               <ComboBox posts={posts} setCurrentId={setCurrentId} />
//             </Grid>
//             <Grid
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{
//                   fontWeight: "bold",
//                   marginTop: "10px",
//                   fontFamily: "Roboto",
//                   color: "#16355d",
//                 }}
//               >
//                 File Upload
//               </Typography>
//               <div
//                 style={{
//                   fontWeight: "bold",
//                   marginTop: "5px",
//                   marginLeft: "10px",
//                 }}
//               >
//                 <input
//                   type="text"
//                   onChange={handleTitleChange}
//                   placeholder="Enter the Title"
//                   defaultValue={title}
//                   onFocus={togglePopup}
//                 />

//                 {titleOpen && (
//                   <TitlePopup setTitle={setTitle} setTitleOpen={setTitleOpen} />
//                 )}
//                 <input
//                   style={{
//                     marginLeft: "50px",
//                     fontFamily: "Roboto",
//                     color: "#16355d",
//                   }}
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".pdf"
//                 />
//               </div>
//             </Grid>
//             <Grid>
//               <button
//                 style={{
//                   fontFamily: "Roboto",
//                   height: "50px",
//                   width: "100px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: isSubmitting ? "not-allowed" : "pointer",
//                   opacity: isSubmitting ? 0.6 : 1,
//                 }}
//                 disabled={isSubmitting}
//                 onClick={handleUpload}
//               >
//                 {isSubmitting ? (
//                   <div style={{ display: "flex" }}>
//                     Uploading... <LoadingSpinner size={16} color="#999" />
//                   </div>
//                 ) : (
//                   <>
//                     Upload <FileUploadIcon />
//                   </>
//                 )}
//               </button>
//             </Grid>
//           </Grid>
//         </Card>
//       </Grid>
//     </>
//   );
// };

// export default Uploading;

// // Delays in uploading file

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Grid, Typography, Box, Button, TextField } from "@mui/material";
import { salarySlipData } from "../../../action/posts";
import ComboBox from "../../ComboBox/ComboBox";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TitlePopup from "./TitlePopup";
import LoadingSpinner from "../../ReactSpinner/reactSpinner";

const Uploading = ({ posts, currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const togglePopup = () => setTitleOpen(!titleOpen);

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (currentId && selectedFile) {
      const MAX_FILE_SIZE_MB = 5;
      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        alert(
          `⚠️ File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`
        );
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("title", title);

      try {
        await dispatch(
          salarySlipData(currentId, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        );

        alert("✅ Salary slip uploaded successfully.");
        setIsSubmitting(false);
        window.location.reload();
      } catch (err) {
        console.log(err);
        setIsSubmitting(false);
      }
    } else {
      console.log("Current ID or file not set");
      setIsSubmitting(false);
    }
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* ComboBox Selection */}
          <Grid item xs={12} md={4}>
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
              gap={2}
            >
              {/* Title Input */}
              <TextField
                label="Enter Title"
                value={title || ""}
                onChange={handleTitleChange}
                onFocus={togglePopup}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true, // disables typing
                }}
                sx={{ flex: 1 }}
              />
              {titleOpen && (
                <TitlePopup setTitle={setTitle} setTitleOpen={setTitleOpen} />
              )}

              {/* File Input */}
              <Button
                variant="contained"
                component="label"
                sx={{ backgroundColor: "#16355d" }}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf"
                />
              </Button>
            </Box>
          </Grid>

          {/* Upload Button */}
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpload}
              disabled={isSubmitting}
              sx={{
                height: 50,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSubmitting ? (
                <Box display="flex" alignItems="center" gap={1}>
                  Uploading <LoadingSpinner size={16} color="#fff" />
                </Box>
              ) : (
                <>
                  Upload <FileUploadIcon sx={{ ml: 1 }} />
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Uploading;
