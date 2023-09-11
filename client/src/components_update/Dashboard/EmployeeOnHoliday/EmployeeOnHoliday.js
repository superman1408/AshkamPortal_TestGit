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

import avatar1 from "../../../image/Profile.jpg";
import avatar2 from "../../../image/profile1.jpg";

const EmployeeOnHoliday = () => {
  return (
    <div>
        <Box
                    sx={{
                      width: "340px",
                      height: "150px",
                      marginTop: "10px",
                      marginLeft: "20px",
                      padding: "10px",
                      bgcolor: "#e9edf7",
                      boxShadow: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bolder" }}>
                      Employees on Holiday
                    </Typography>
                    <div>
                      <Stack flexDirection="row" spacing={2}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            marginLeft: "10px",
                            marginTop: "10px",
                          }}
                          alt="Femy sharp"
                          src={avatar1}
                        />
                      </Stack>
                    </div>
                    <Typography
                      sx={{
                        marginLeft: "100px",
                        marginRight: "20px",
                        marginTop: "-30px",
                      }}
                    >
                      unhealthy
                    </Typography>
                    <Typography
                      sx={{
                        color: "#f7100c",
                        marginLeft: "250px",
                        marginTop: "-20px",
                      }}
                    >
                      only today
                    </Typography>

                    <Divider />
                    <div>
                      <Stack flexDirection="row" spacing={2} marginTop={2}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            marginLeft: "10px",
                            marginTop: "10px",
                          }}
                          alt="Femy sharp"
                          src={avatar2}
                        />
                      </Stack>
                    </div>
                    <Typography
                      sx={{
                        marginLeft: "100px",
                        marginRight: "30px",
                        marginTop: "-30px",
                      }}
                    >
                      On holiday
                    </Typography>
                    <Typography
                      sx={{
                        color: "#f7100c",
                        marginLeft: "250px",
                        marginTop: "-20px",
                      }}
                    >
                      21st to 22nd
                    </Typography>
                  </Box>
    </div>
  )
}

export default EmployeeOnHoliday