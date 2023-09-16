import React, { useEffect, useState} from 'react';
import { Typography, Avatar, } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { getPost, updateStatus } from '../../../../actions/posts';
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';




const MessageBody = ({post,currentId}) => {
  const [activeStatus, setActiveStatus] = useState({status: "pending"});
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("1");

  
  let array = [];


  const updateArray = async () => {
    console.log(post.emailTo.length);
    for (let index = 0; index < post.emailTo.length; index++) {
      await array.push({emailTo: post.emailTo[index],subject: post.subject[index],message: post.message[index],status: post.status[index],attachment: post.attachment[index]});
    }
    setLoading(false);
    console.log("2");
  };


  useEffect(() => {
    if (isLoading === true) {
      dispatch(getPost(currentId));
      updateArray();
      console.log("useEffect is running...!!!");
      console.log("3");
      setLoading(false);
    }else{
      console.log("3 is there");
      // updateArray();
    };
  },[isLoading]);



  const handleAccept = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({...activeStatus, status : "Accepted"});
      dispatch(updateStatus(post._id,{status:"Accepted"}));
      // navigate('/');
      // updateArray();
      // setLoading(true);
    } else {
      console.log("Status already set");
    }
    // setActiveStatus({...activeStatus, status : "Accepted"});
    console.log("4");
    navigate('/');
  };


  const handleReject = () => {
    console.log(activeStatus.status);
    // e.preventDefault();
    if (activeStatus.status === "pending") {
      setActiveStatus({...activeStatus, status : "Rejected"});
      dispatch(updateStatus(post._id,{status:"Rejected"}));
      // navigate('/');
      // updateArray();
      // setLoading(true);
    } else {
      console.log("Status already set");
    }
    // setActiveStatus({...activeStatus, status : "Rejected"});
    console.log("5");
    navigate('/');
  };


  for (let index = 0; index < post.emailTo.length; index++) {
    array.push({emailTo: post.emailTo[index],subject: post.subject[index],message: post.message[index],status: post.status[index],attachment: post.attachment[index]});
    // array.push({subject: post.subject[index]});
    // array.push({message: post.message[index]});
    // array.push({status: post.status[index]});
    // array.push({attachment: post.attachment[index]});
    console.log("6");
  };


  console.log("7");



  return (
    isLoading ? <CircularProgress /> : (
      currentId && (
        <div key={post.id} className="w-[800px] flex flex-col   p-2 border">
          {array.map((item) => (
            <div key={item.length} className='w-full shadow-2xl  p-2 m-2'>
                <div key={post.login}  className='content-center'>
                  <Typography className='font-sans  text-[28px] text-center p-2 m-2'>{item.subject}</Typography>
                </div>
                <div className='grid grid-row p-2 m-2'>
                  <div className='flex justify-between p-2 m-2'>
                    <div key={post.contact} className='w-[125px]  gap-5'>
                      <Avatar alt="avatar" src={ post.selectedFile } size='xs'  withBorder={true} className="p-0.5"/>
                      <Typography className='tracking-wide'>{post.name}</Typography>
                    </div>
                    {
                      item.status && (
                        // isLoading === false && (
                          <div key={post.department} className=''>
                            {/* setActiveStatus({{...activeStatus,status:item.status}}) */}
                            <Typography  alignright="true">Status :{ item.status }</Typography>
                          </div>
                      // )
                      )
                    }
                  </div>
                  <div key={post.punching} style={{border: "2px solid black", padding:"2px", margin: "2px"}}>
                    <Typography className='p-2 m-2'>{item.message}</Typography>
                  </div>
                  <div key={post._id} className='flex flex-row justify-between gap-4 m-5'>
                    <button className='rounded-full ring-2 ring-green-500' onClick={handleAccept}>Accept</button>
                    <button className='rounded-full ring-2 ring-red-500' onClick={handleReject}>Reject</button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      )
    )
  )
}

export default MessageBody;