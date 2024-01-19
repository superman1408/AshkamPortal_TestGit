import React from 'react';

import { Card, Typography} from "@mui/material";


const TimeSheet = ({post,currentId}) => {

  const array = [];
  for (let i = 0; i < post.jobCode.length; i++) {
    array.push({
      job: post.jobCode[i],
      hours: post.hoursWorked[i],
      startTime: post.startTime[i],
      endTime: post.endTime[i]
    })
    
  };




  return (
    <div>
        {
          array.map((item, i) => (
            <Card
              elevation={10}
              sx={{
                padding: "5px",
                width: "auto",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "#FFFFFF",
              }}
            >
              <div key={i} className="translate-x-[42%]">
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "left",
                    padding: "5px",
                    fontWeight: "bold",
                  }}
                >
                  JobCode: {item.job} ---- Start Time: {item.startTime} ---- Hours Of Work: {item.hours} ---- End Time: {item.endTime}
                </Typography>
              </div>
            </Card>
          ))
        }
    </div>
  )
}

export default TimeSheet;
