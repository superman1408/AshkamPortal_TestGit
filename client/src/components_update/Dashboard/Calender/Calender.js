import React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

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
                      width: "360px",
                      height: "320px",
                      marginTop: "10px",
                      marginLeft: "20px",

                      bgcolor: "#9e9e9e",
                      boxShadow: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      sx={{ width: "350px", height: "150px" }}
                    >
                      <DateCalendar
                        showDaysOutsideCurrentMonth
                        show
                        onChange={onChange}
                      />
                    </LocalizationProvider>
                  </Box>
    </div>
  )
}

export default Calender