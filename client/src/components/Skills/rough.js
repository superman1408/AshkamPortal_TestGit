import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Input,
  Avatar,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Skill = () => {
  const initialData = {
    name: "",
    tool: "",
    language: "",
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
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid
              sx={{
                marginBottom: "20px",
                marginTop: "5px",
                marginLeft: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "bolder" }}>Top skills</Typography>
              {Object.keys(initialData).map((field) => (
                <div key={field} style={{ marginTop: "5px" }}>
                  {isEditing ? (
                    <Input
                      value={editedData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      onBlur={handleEditToggle}
                    />
                  ) : (
                    <div style={{ display: "flex" }}>
                      <Avatar
                        sx={{
                          width: "5px",
                          height: "5px",
                          bgcolor: "#505c2e",
                        }}
                        alt="avatar"
                      >
                        {" "}
                        {editedData[field].charAt(0)}
                      </Avatar>
                      <Typography sx={{ fontWeight: "bolder" }}>
                        {editedData[field]}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
            </Grid>
            <Grid>
              <IconButton
                size="50px"
                color="black"
                onClick={isEditing ? handleSave : handleEditToggle}
                sx={{
                  ml: "160px",
                  mt: "0px",
                  display: {
                    xs: "flex",
                    sm: "flex",
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Skill;
