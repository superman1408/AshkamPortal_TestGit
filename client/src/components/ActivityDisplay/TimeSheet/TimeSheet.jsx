import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import TimeSheetForm from '../TimeSheetForm/TimeSheetForm';
// import { getPosts, getPost } from '../../../action/posts';

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
            <li key={i}>
              {item}
            </li>
          ))
        }
    </div>
  )
}

export default TimeSheet;
