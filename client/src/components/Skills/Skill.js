import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts, updatePost } from "../../action/posts";
import {
  Grid,
  IconButton,
  Typography,
  Input,
  Avatar,
  Divider,
  Button,
  Container,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

// import {useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { skillData } from "../../action/posts";

const Skill = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const posts = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    reportingManager: "",
    jobTitle: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (!currentId) return setCurrentId(id);
    dispatch(getPosts())
      .then(() => {
        console.log("Data is received in the Skills  module");
        posts.map((items) => {
          for (let index = 0; index <= posts.length; index++) {
            if (items._id === currentId) {
              setFormData(() => ({
                ...formData,
                firstName: items.firstName,
                lastName: items.lastName,
                department: items.department,
                reportingManager: items.reportingManager,
                selectedFile: items.selectedFile,
              }));
              setSelectedOption(items.role);

              break;
            }
          }
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [currentId, isLoading]);
  console.log(currentId);

  const dispatch = useDispatch();
  // const useNavigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  // const [editedData, setEditedData] = useState(formData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Perform save operation with editedData
    console.log("Saving:", formData);
    // After saving, toggle back to view mode
    setIsEditing(false);

    console.log(formData);
    // if (currentId) {
    dispatch(skillData(formData));
    // } else {
    //   console.log(Error);
    // }
  };


  

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          padding: "10px",
          bgcolor: "#f2d5d6",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",
          // width: "100%",
          overflow: "hidden",
          position: "relative", // Set position to relative
        }}
      >
        <Grid
          sx={{
            marginBottom: "22px",
            marginTop: "5px",
            marginLeft: "10px",

            marginRight: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bolder",
              color: "#16355d",
              fontFamily: "Roboto",
              fontSize: "18px",
            }}
          >
          My Department
          </Typography>
          {Object.keys(formData).map((field) => (
            <div key={field} style={{ marginTop: "5px" }}>
              {isEditing ? (
                <Input
                  value={formData[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                />
              ) : (
                <div style={{ display: "flex", marginTop: "10px" }}>
                  <Avatar
                    sx={{
                      width: "25px",
                      height: "25px",
                      bgcolor: "#505c2e",
                    }}
                    alt="avatar"
                  >
                    {formData[field].selectedFile}
                    {/* {formData[field].charAt(0)} */}
                  </Avatar>
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      marginLeft: "10px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {formData[field].firstName}
                  </Typography>
                </div>
              )}
            </div>
          ))}
          <Divider />
        </Grid>
        {/* <Grid>
          <IconButton
            size="50px"
            color="black"
            onClick={isEditing ? handleSave : handleEditToggle}
            sx={{
              position: "absolute", // Set position to absolute
              right: "5px", // Adjust the left position
              top: "0px",
            }}
          >
            <MoreVertIcon />
          </IconButton>
          {isEditing && (
            <Button
              sx={{ float: "right", marginTop: "200px" }}
              type="submit"
              variant="contained"
              size="small"
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              Save
            </Button>
          )}
        </Grid> */}
      </Container>
    </div>
  );
};

export default Skill;
