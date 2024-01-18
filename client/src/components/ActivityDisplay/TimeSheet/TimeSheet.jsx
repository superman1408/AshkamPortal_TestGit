import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import TimeSheetForm from '../TimeSheetForm/TimeSheetForm';
// import { getPosts, getPost } from '../../../action/posts';
import { Button, Card, Typography, Avatar } from "@mui/material";
// const time = [{employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}, {employeeId: "12345", jobCode: "AEPL-002-PL-001", start: "9th Jan 2024", hoursWorked: "5", end:"12th Jan 2024"}];

const TimeSheet = ({post,currentId}) => {
  // console.log(currentId);
  // const  timeSheets  = useSelector((state) => state.posts);
  // const [sheets, setSheets] = useState({posts})
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPost(currentId));
  //   }
  // },[post, dispatch, timeSheets, currentId])

  // console.log(post);
  return (
    <div>
        {
          post.jobCode.map((item, i) => (
            <Card
              elevation={10}
              sx={{
                padding: "5px",
                width: "auto",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "#aee3e8",
              }}
            >
              <div key={i} className="translate-x-[42%]">
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    padding: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </Typography>
              </div>
            </Card>
          ))
        }
    </div>
  )
}

export default TimeSheet;
