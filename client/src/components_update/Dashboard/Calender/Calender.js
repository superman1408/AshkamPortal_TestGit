import React from "react";
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "20px",
          marginRight: "0px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "10px",
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ display: "flex", marginLeft: "0px" }}
          >
            <DateCalendar
              showDaysOutsideCurrentMonth
              show
              onChange={onChange}
            />
          </LocalizationProvider>
        </Grid>
      </Box>
    </div>
  );
};

export default Calender;
