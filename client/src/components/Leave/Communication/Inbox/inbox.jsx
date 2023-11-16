import React from "react";
import { Card, CardHeader, Typography, Avatar } from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";

const Inbox = ({ post, setCurrentId }) => {
  const openMessage = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
  };

  return (
    <Card>
      <ButtonBase onClick={openMessage}>
        <CardHeader className="flex flex-row shadow-2xl p-2 ">
          <div className="w-[90px] flex-wrap p-2">
            <Avatar
              alt="avatar"
              src={post?.selectedFile}
              withBorder={true}
              color="green"
              className="p-0"
            />
          </div>

          <div className="flex flex-col">
            <Typography variant="h5" color="blue" className="text-[24px]">
              {post?.name}
            </Typography>
            <Typography variant="h6" color="pink" className="text-[12px]">
              {post?.email}
            </Typography>
          </div>
        </CardHeader>
      </ButtonBase>
    </Card>
  );
};

export default Inbox;
