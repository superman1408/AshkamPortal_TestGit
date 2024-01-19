import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Input,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Skill = () => {
  const initialData = {
    skill1: "",
    skill2: "",
    skill3: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Perform save operation with editedData
    console.log("Saving:", editedData);
    // After saving, toggle back to view mode
    setIsEditing(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          padding: "8px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
          width: "300px",
          overflow: "hidden",
          position: "relative", // Set position to relative
        }}
      >
        <Grid
          sx={{
            marginBottom: "20px",
            marginTop: "5px",
            marginLeft: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bolder" }}>Top skills</Typography>
          {Object.keys(initialData).map((field) => (
            <div key={field} style={{ marginTop: "5px" }}>
              {isEditing ? (
                <Input
                  value={editedData[field]}
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
                    {" "}
                    {editedData[field].charAt(0)}
                  </Avatar>
                  <Typography sx={{ fontWeight: "bolder", marginLeft: "10px" }}>
                    {editedData[field]}
                  </Typography>
                </div>
              )}
            </div>
          ))}
          <Divider />
        </Grid>
        <Grid>
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
              sx={{ float: "right", marginTop: "110px" }}
              type="submit"
              variant="contained"
              size="small"
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              Save
            </Button>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Skill;
