import React, { useEffect, useState } from "react";

// import YourComponent  from "../rough";
import { useParams } from "react-router-dom";
import TotalEmployee from "./TotalEmployee";

const TotalemployeeDisplay = () => {
  const [currentId, setCurrentId] = useState(null);
  const { id } = useParams();
  // console.log("id in skill page", id);

  useEffect(() => {
    setCurrentId(id);
  }, [currentId, id]);

  return (
    // <div>ActivityDisplay</div>
    <div>
      {/* <TimeSheetForm/> */}

      <TotalEmployee />
    </div>
  );
};

export default TotalemployeeDisplay;
