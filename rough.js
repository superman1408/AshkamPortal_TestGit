import React, { useState } from 'react';

const PunchTime = () => {
  const [punchedDateTime, setPunchedDateTime] = useState(null);

  const handlePunch = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Format the date as needed

    setPunchedDateTime(formattedDate);
  };

  return (
    <div>
      <h2>Punch Time</h2>
      <button onClick={handlePunch}>Punch</button>
      {punchedDateTime && <p>Punched Date and Time: {punchedDateTime}</p>}
    </div>
  );
};

export default PunchTime;
