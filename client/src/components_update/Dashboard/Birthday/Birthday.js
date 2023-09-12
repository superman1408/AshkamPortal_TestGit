import React, {useState, useEffect} from 'react';
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
import Image from "../../../image/Balloon.png";


import ReactConfetti from "react-confetti";


const Birthday = () => {
    const [Btn, setBtn] = useState(false);
    const [dimension, setDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    
      
    
      const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
      };

      useEffect(() => {
        window.addEventListener("resize", detectSize);
        return () => {
          window.removeEventListener("resize", detectSize);
        };
      }, [dimension]);
    
  return (
    <div>
        <Box
                    sx={{
                      // width: "340px",
                      // height: "70px",
                      display: "flex",
                      marginTop: "10px",
                      marginLeft: "20px",
                      padding: "2px",
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      borderRadius: "10px",
                      backgroundImage: `url(${Image})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <Stack flexDirection="row">
                      <Avatar
                        sx={{ width: 40, height: 40, marginLeft: "20px", marginTop: "10px" }}
                        alt="Femy sharp"
                        src={avatar1}
                      />
                    </Stack>
                    <Grid>
                    <Typography
                      variant="h6"
                      sx={{ marginLeft: "40px" }}
                    >
                      Femy sharp
                    </Typography>
                    <Typography sx={{ marginLeft: "40px", fontSize: "13px" }}>
                      Has birthday today
                    </Typography>

                    <Button
                      sx={{
                        marginLeft: "50px",
                        marginRight: "0px",
                        bgcolor: "#ecd0f5",
                        fontSize: "13px",
                      }}
                      onClick={() => setBtn(!Btn)}
                    >
                      wish him
                    </Button>
                    {Btn && (
                      <ReactConfetti
                        width={dimension.width}
                        height={dimension.height}
                        tweenDuration={100}
                      />
                    )}
                   </Grid>
                    <div class="btn-particles"></div>
                  </Box>
    </div>
  )
}

export default Birthday