import React, { useEffect, useState } from "react";

import Skill from "./Skill";
// import YourComponent  from "../rough";
import { useParams } from "react-router-dom";
// import TimeSheetForm from './TimeSheetForm/TimeSheetForm';

const SkillDisplay = () => {
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  console.log("id in skill page", id);

  useEffect(() => {
    setCurrentId(id);
  }, [currentId, id]);

  return (
    // <div>ActivityDisplay</div>
    <div>
      {/* <TimeSheetForm/> */}

      <Skill />
    </div>
  );
};

export default SkillDisplay;
