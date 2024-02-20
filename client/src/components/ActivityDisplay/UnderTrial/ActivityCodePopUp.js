import React, { useState, useEffect } from "react";

const ActivityCodePopUp = ({ setActivityCode, setActivityOpen }) => {
  const [disciplineCode, setDisciplineCode] = useState();
  const [discipline, setDiscipline] = useState();

  const appendData = () => {
    const updatedList = disciplineCode; // Combine disciplineCode and year
    setActivityCode(updatedList);
    console.log(updatedList);
    setActivityOpen(false);
  };

  const closetoggle = () => {
    setActivityOpen(false);
  };

  const handleDisciplineChange = (event) => {
    const selectedDiscipline = event.target.value;
    const selectedDisciplineCode = getDisciplineCode(selectedDiscipline); // Convert month name to month number
    setDiscipline(selectedDiscipline);
    setDisciplineCode(selectedDisciplineCode); // Update month state with the month number
    console.log("selectedDisciplineCoden", selectedDisciplineCode);
  };

  // Function to convert month name to its number
  const getDisciplineCode = (DisciplineName) => {
    const Disciplines = {
      Select: "--",
      Account: "AC",
      Administration: "AD",
      Architectural: "AR",
      BusinessDevelopment: "BD",
      CivilORstructural: "CS",
      Construction: "CO",
      Electrical: "EL",
      HSE: "HS",
      HumanResource: "HR",
      HVAC: "HV",
      Instrumentation: "IN",
      Management: "MG",
      Mechanical: "ME",
      Naval: "NA",
      Piping: "PI",
      Process: "PR",
      Procurement: "PC",
      Projects: "PJ",
      Telecom: "TE",
    };

    return Disciplines[DisciplineName];
  };

  useEffect(() => {
    console.log(discipline);
  }, [discipline]);

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Project Code</h5>
            <button type="button" className="close" onClick={closetoggle}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              {/*_______________Discipline Code____________________  */}

              <label>Discipline</label>
              <select
                style={{
                  width: "200px",
                  height: "30px",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
                name="Discipline"
                value={discipline}
                onChange={handleDisciplineChange}
              >
                <option value="select">Select</option>
                <option value="Account">Account</option>
                <option value="Administration">Administration</option>
                <option value="Architectural">Architectural</option>
                <option value="BusinessDevelopment">
                  Business Development
                </option>
                <option value="Civil/structural">Civil/ structural</option>
                <option value="Construction">Construction</option>
                <option value="Electrical">Electrical</option>
                <option value="HSE">HSE</option>
                <option value="HumanResource">Human Resource</option>
                <option value="HVAC">HVAC</option>
                <option value="Instrumentation">Instrumentation</option>
                <option value="Management">Management</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Naval">Naval</option>
                <option value="Piping">Piping</option>
                <option value="Process">Process</option>
                <option value="Procurement">Procurement</option>
                <option value="Projects">Projects</option>
                <option value="Telecom">Telecom</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={appendData}
            >
              Save
            </button>
            {/* Add additional buttons or actions if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCodePopUp;
