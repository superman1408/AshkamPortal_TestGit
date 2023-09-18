import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Search,
  Stack,
  Avatar,
  Button,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Skill = () => {
  return (
    <div>
      <Box
        sx={{
          // width: "300px",
          // height: "150px",
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
            </Grid>
            <Grid>
              <IconButton
                size="50px"
                color="black"
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

          <Grid>
            <Stack direction="row" marginLeft={1}>
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  marginRight: "20px",
                  bgcolor: "#505c2e",
                }}
              >
                UX
              </Avatar>
              UX design
            </Stack>
          </Grid>

          <Divider />

          <Grid>
            <Stack direction="row" marginTop={1} marginLeft={1}>
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  marginRight: "20px",
                  bgcolor: "#5a508a",
                }}
              >
                A
              </Avatar>
              AutoCAD
            </Stack>
          </Grid>

          <Divider />

          <Grid>
            <Stack direction="row" marginLeft={1} marginTop={1}>
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  marginRight: "20px",
                  bgcolor: "#804555",
                }}
              >
                J
              </Avatar>
              Java
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Skill;
