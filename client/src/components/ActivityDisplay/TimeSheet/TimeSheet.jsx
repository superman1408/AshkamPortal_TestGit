import React, { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";

const TimeSheet = ({ post, currentId }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const array = [];
  for (let i = 0; i < post.jobCode.length; i++) {
    array.push({
      job: post.jobCode[i],
      hours: post.hoursWorked[i],
      startTime: post.startTime[i],
      endTime: post.endTime[i],
    });
  }

  const openEditDialog = () => {
    setDialogOpen(true);
  };

  const closeEditDialog = () => {
    setDialogOpen(false);
    console.log("Job Code is Updated");
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Card sx={{ bgcolor: "white" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: "#333",
                height: "30px",
                margin: "5px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "white", margin: "5px", marginLeft: "140px" }}
              >
                JOB CODE
              </Typography>
              <Typography
                sx={{ color: "white", margin: "5px", marginLeft: "150px" }}
              >
                START DATE
              </Typography>
              <Typography
                sx={{ color: "white", margin: "5px", marginLeft: "150px" }}
              >
                WORKING HOUR
              </Typography>
              <Typography
                sx={{ color: "white", margin: "5px", marginLeft: "170px" }}
              >
                END DATE
              </Typography>
            </div>

            {array.map((item, i) => (
              <Box
                key={i}
                elevation={10}
                sx={{
                  width: "auto",
                  height: "30px",
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  bgcolor: i % 2 === 0 ? "#CCCCCC" : "#F0F0F0",
                }}
              >
                <div
                  key={i}
                  className="translate-x-[42%]"
                  style={{ display: "flex" }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      flex: "1",
                      marginLeft: "100px",
                    }}
                  >
                    {item.job}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", flex: "1" }}>
                    {item.startTime}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", flex: "1" }}>
                    {item.hours}{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", flex: "1" }}>
                    {item.endTime}
                  </Typography>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={openEditDialog}
                  >
                    Edit
                  </Button>
                </div>
              </Box>
            ))}
          </Card>

          {/* Edit Dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={closeEditDialog}
            sx={{ width: "auto" }}
          >
            <DialogTitle>Edit Job</DialogTitle>
            <DialogContent>
              <div>
                <Typography>Job Code :</Typography>
                <TextField />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeEditDialog} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default TimeSheet;
