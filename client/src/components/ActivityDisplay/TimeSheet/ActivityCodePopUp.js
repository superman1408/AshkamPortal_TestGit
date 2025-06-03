import React, { useState, useEffect } from "react";

const ActivityCodePopUp = ({ setActivityCode, setActivityOpen }) => {
  const [disciplineCode, setDisciplineCode] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [activities, setActivities] = useState("");
  const [activitiesCode, setActivitiesCode] = useState("");

  const [subActivityCode, setSubActivityCode] = useState("");
  const [subActivity, setSubActivity] = useState("");

  const appendData = () => {
    const updatedList = disciplineCode + activitiesCode + subActivityCode; // Combine disciplineCode and year
    // const updatedList = disciplineCode + ; // Combine disciplineCode and year
    setActivityCode(updatedList);
    setActivityOpen(false);
  };

  const closetoggle = () => {
    setActivityOpen(false);
  };

  //  ---------------Discipline Code Function -------------------------------

  const handleDisciplineChange = (event) => {
    const selectedDiscipline = event.target.value;
    const selectedDisciplineCode = getDisciplineCode(selectedDiscipline); // Convert month name to month number
    setDiscipline(selectedDiscipline);
    setDisciplineCode(selectedDisciplineCode); // Update month state with the month number
  };

  const handleActivitiesChange = (event) => {
    const selectedActivities = event.target.value;
    const selectedActivitiesCode = getActivitiesCode(selectedActivities); // Convert month name to month number
    setActivities(selectedActivities);
    setActivitiesCode(selectedActivitiesCode); // Update month state with the month number
  };

  // Function to convert month name to its number
  const getDisciplineCode = (DisciplineName) => {
    const Disciplines = {
      Select: "--",
      Account: "AC",
      Administration: "AD",
      Architectural: "AR",
      BusinessDevelopment: "BD",
      CivilORStructural: "CS",
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

  const getActivitiesCode = (ActivitiesCode) => {
    const Activities = {
      Select: "--",
      Calculations: "CL",
      DocumentationControl: "DC",
      Documents: "DO",
      Drawings: "DR",
      General: "GN",
      Lists: "LI",
      Projectcontrol: "PC",
      ProjectManagement: "PM",
      Task: "TA",
    };

    return Activities[ActivitiesCode];
  };

  useEffect(() => {}, [discipline]);

  //  ---------------Sub  Activity Code Function -------------------------------

  const handleSubActivityChange = (event) => {
    const selectedSubActivity = event.target.value;
    const selectedSubActivityCode = getSubActivityCode(selectedSubActivity); // Convert month name to month number
    setSubActivity(selectedSubActivity);
    setSubActivityCode(selectedSubActivityCode); // Update month state with the month number
  };

  // Function to convert month name to its number
  const getSubActivityCode = (SubActivityName) => {
    const SubActivityies = {
      Select: "--",
      Airflow: "001",
      CableSchedule: "002",
      CableSizing: "003",
      CableTrayORConduit: "004",
      Coordination: "005",
      CoordinationORSupervision: "006",
      DataSheets: "007",
      DocReviews: "008",
      DocumentIssue: "009",
      DocumentReciept: "010",
      DocumentReporting: "011",
      Duct: "012",
      Earthing: "013",
      EquipmentLayout: "014",
      EquipmentSizing: "015",
      Equipments: "016",
      ExternalMeetings: "017",
      FEA: "018",
      Foundation: "019",
      FoundationLayout: "020",
      HAZ: "021",
      HeatandMassBalance: "022",
      I_OR_Olist: "023",
      InstrumentLayout: "024",
      InstrumentList: "025",
      Instruments: "026",
      InterfaceSchedule: "027",
      InternalMeetings: "028",
      InvoiceInput: "029",
      layout: "030",
      Lighting: "031",
      LightningProtection: "032",
      LineList: "033",
      LineSizing: "034",
      LoadList: "035",
      LoopDrawings: "036",
      Meetings: "037",
      Mooring: "038",
      MooringLines: "039",
      MTO: "040",
      P_OR_ID: "041",
      PFD: "042",
      PipeStress: "043",
      PipingLayout: "044",
      Planning: "045",
      PowerSystemCalculations: "046",
      ProjectSupport: "047",
      Proposals: "048",
      PumpSizing: "049",
      Reporting: "050",
      SchematicDrawings: "051",
      SingleLineDrawings: "052",
      Specifications: "053",
      Structural: "054",
      StructuralDrawings: "054",
      Training: "056",
      ValveSizing: "057",
    };

    return SubActivityies[SubActivityName];
  };

  useEffect(() => {}, [discipline]);

  const activityHierarchy = {
    Account: {
      Documents: ["InvoiceInput", "DocumentReciept", "Reporting"],
      Reporting: ["InvoiceInput", "DocumentReporting"],
    },
    Electrical: {
      Drawings: ["SingleLineDrawings", "LoopDrawings"],
      Calculations: ["CableSizing", "Lighting", "Earthing"],
    },
    Mechanical: {
      Calculations: ["PumpSizing", "ValveSizing"],
      Drawings: ["EquipmentLayout", "PipingLayout"],
    },
    // Add other disciplines similarly...
  };

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
                <option value="CivilORStructural">Civil/ Structural</option>
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

            <div>
              {/*_______________Activity Code____________________  */}

              <label
                style={{
                  marginTop: "20px",
                }}
              >
                Activities
              </label>

              <select
                style={{
                  width: "200px",
                  height: "30px",
                  fontSize: "16px",
                  marginTop: "10px",
                }}
                name="Activities"
                value={activities}
                onChange={handleActivitiesChange}
                disabled={!discipline}
              >
                <option value="select">Select</option>
                {discipline &&
                  Object.keys(activityHierarchy[discipline] || {}).map(
                    (act) => (
                      <option key={act} value={act}>
                        {act}
                      </option>
                    )
                  )}
                {/* <option value="Calculations">Calculations</option>
                <option value="DocumentationControl">
                  Documentation Control
                </option>
                <option value="Documents">Documents</option>
                <option value="Drawings">Drawings</option>
                <option value="General">General</option>
                <option value="Lists">Lists</option>
                <option value="Projectcontrol">Project Control</option>
                <option value="ProjectManagement">Project Management</option> */}
              </select>

              <div>
                {/*_______________Discipline Code____________________  */}

                <label
                  style={{
                    marginTop: "20px",
                  }}
                >
                  Sub Activities
                </label>
                <select
                  style={{
                    width: "200px",
                    height: "30px",
                    fontSize: "16px",
                    marginTop: "10px",
                  }}
                  name="Discipline"
                  value={subActivity}
                  onChange={handleSubActivityChange}
                  disabled={!activities}
                >
                  <option value="select">Select</option>
                  {discipline &&
                    activities &&
                    (activityHierarchy[discipline]?.[activities] || []).map(
                      (sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      )
                    )}
                  {/* <option value="Airflow">Air flow</option>
                  <option value="CableSchedule">Cable Schedule</option>
                  <option value="CableSizing">Cable Sizing</option>
                  <option value="CableTrayORConduit">Cable Tray/Conduit</option>
                  <option value="Coordination">Coordination</option>
                  <option value="CoordinationORSupervision">
                    Coordination/ supervision
                  </option>
                  <option value="DataSheets">Data Sheets</option>
                  <option value="DocReviews">Doc Reviews</option>
                  <option value="DocumentIssue">Document Issue</option>
                  <option value="DocumentReciept">Document Reciept</option>
                  <option value="DocumentReporting">Document Reporting</option>
                  <option value="Duct">Duct</option>
                  <option value="Earthing">Earthing</option>
                  <option value="EquipmentLayout">Equipment Layout</option>
                  <option value="EquipmentSizing">Equipment Sizing</option>
                  <option value="Equipments">Equipments</option>
                  <option value="ExternalMeetings">External Meetings</option>
                  <option value="FEA">FEA</option>
                  <option value="Foundation">Foundation</option>
                  <option value="FoundationLayout">Foundation Layout</option>
                  <option value="HAZ">HAZ</option>
                  <option value="HeatandMassBalance">
                    Heat and Mass Balance
                  </option>
                  <option value="I_OR_Olist">I/Olist</option>
                  <option value="InstrumentLayout">Instrument Layout</option>
                  <option value="InstrumentList">Instrument List</option>
                  <option value="Instruments">Instruments</option>
                  <option value="InterfaceSchedule">Interface Schedule</option>
                  <option value="InternalMeetings">Internal Meetings</option>
                  <option value="InvoiceInput">Invoice Input</option>
                  <option value="layout">layout</option>
                  <option value="Lighting">Lighting</option>
                  <option value="LightningProtection">
                    Lightning Protection
                  </option>
                  <option value="LineList">Line List</option>
                  <option value="LineSizing">Line Sizing</option>
                  <option value="LoadList">Load List</option>
                  <option value="LoopDrawings">Loop Drawings</option>
                  <option value="Meetings">Meetings</option>
                  <option value="Mooring">Mooring</option>
                  <option value="MooringLines">Mooring Lines</option>
                  <option value="MTO">MTO</option>
                  <option value="P_OR_ID">P/ID</option>
                  <option value="PFD">PFD</option>
                  <option value="PipeStress">Pipe Stress</option>
                  <option value="PipingLayout">Piping Layout</option>
                  <option value="Planning">Planning</option>
                  <option value="PowerSystemCalculations">
                    Power System Calculations
                  </option>
                  <option value="ProjectSupport">Project Support</option>
                  <option value="Proposals">Proposals</option>
                  <option value="PumpSizing">Pump Sizing</option>
                  <option value="Reporting">Reporting</option>
                  <option value="SchematicDrawings">Schematic Drawings</option>
                  <option value="SingleLineDrawings">
                    Single Line Drawings
                  </option>
                  <option value="Specifications">Specifications</option>
                  <option value="Structural">Structural</option>
                  <option value="StructuralDrawings">
                    Structural Drawings
                  </option>
                  <option value="Training">Training</option>
                  <option value="ValveSizing">Valve Sizing</option> */}
                </select>
              </div>
            </div>
            <div
              className="modal-footer"
              style={{
                marginTop: "20px",
              }}
            >
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
    </div>
  );
};

export default ActivityCodePopUp;
