import React from 'react';
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
                        width: "300px",
                        height: "150px",
                        marginTop: "20px",
                        marginLeft: "20px",
                        padding: "10px",
                        bgcolor: "#9e9e9e",
                        boxShadow: 1,
                        borderRadius: "10px",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bolder" }}>
                        Top skills
                      </Typography>
                      <IconButton
                        size="100px"
                        color="black"
                        sx={{
                          ml: "270px",
                          mt: "-30px",
                          display: {
                            xs: "flex",
                            sm: "flex",
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      <Stack direction="row" spacing={1} marginLeft={1}>
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
                      <Divider />
                      <Stack
                        direction="row"
                        spacing={1}
                        marginTop={1}
                        marginLeft={1}
                      >
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            marginRight: "50px",
                            bgcolor: "#5a508a",
                          }}
                        >
                          A
                        </Avatar>
                        AutoCAD
                      </Stack>
                      <Divider />
                      <Stack
                        direction="row"
                        spacing={1}
                        marginLeft={1}
                        marginTop={1}
                      >
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
                    </Box>
    </div>
  )
}

export default Skill