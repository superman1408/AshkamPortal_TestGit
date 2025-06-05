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
      ProjectManagement: "PM",
      Mechanical: "ME",
      NavalArchitecture: "NA",
      PipingORPipeline: "PI",
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
      Assembly: "AS",
      Calculations: "CL",
      DocumentationControl: "DC",
      Documents: "DO",
      Drawings: "DR",
      General: "GN",
      Lists: "LI",
      Projectcontrol: "PC",
      ProjectEngineering: "PE",
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
      Algorithm: "002",
      BarBendingSchedule: "002",
      CableSchedule: "003",
      CableSchedule1: "004",
      CableSizing: "003",
      CableTrayORConduit: "003",
      CableTrayORConduit1: "004",
      CableTrayORConduit2: "007",
      Coordination: "001",
      CoordinationORSupervision: "001",
      DataSheets: "002",
      DocReviews: "001",
      Duct: "002",
      Earthing: "004",
      Earthing1: "005",
      Electrical: "001",
      Equipments: "005",
      EquipmentLayout: "001",
      EquipmentLayouts: "003",
      EquipmentSizing: "001",
      EquipmentSizing1: "002",
      EquipmentSizing2: "006",
      Equipments: "005",
      FEA_OR_CFD: "002",
      FoundationLayout: "003",
      GeneralArrangement: "001",
      HAZ: "021",
      HeatandMassBalance: "002",
      I_OR_Olist: "002",
      InstrumentLayout: "001",
      InstrumentList: "003",
      Instruments: "001",
      InterfaceSchedule: "004",
      InterfaceSchedule1: "005",
      layout: "001",
      Leave: "004",
      Lighting: "005",
      Lighting1: "006",
      LightningProtection: "006",
      LightningProtection1: "007",
      LineList: "001",
      LineSizing: "001",
      LoadList: "002",
      LoopDrawings: "004",
      MaxsurfStability: "003",
      Mechanical: "002",
      Meetings: "002",
      MooringLayout: "002",
      MooringAnalysis: "001",
      NavalArchCalcs: "004",
      MTO: "001",
      MTO1: "002",
      MTO_OR_BOQ: "001",
      P_OR_ID: "002",
      PFD: "001",
      PipeStress: "002",
      PipingLayout: "002",
      Planning: "001",
      PowerSystemCalculations: "001",
      Proposals: "001",
      Report: "001",
      Reports: "003",
      Reporting: "003",
      SacsOffshore: "005",
      Schematics: "004",
      SchematicDrawings: "002",
      SingleLineDrawings: "001",
      Specifications: "001",
      StructuralDrawing: "001",
      StructuralDrawings: "002",
      SubStructure: "001",
      SuperStructure: "002",
      Testing: "001",
      Training: "003",
      Three_D_Model: "001",
    };

    return SubActivityies[SubActivityName];
  };

  useEffect(() => {}, [discipline]);

  const activityHierarchy = {
    ProjectManagement: {
      Projectcontrol: ["Planning", "Meetings", "Reporting"],
      ProjectEngineering: ["Coordination", "Meetings"],
      DocumentationControl: ["Coordination", "Meetings"],
    },
    Process: {
      Lists: ["LineList", "HeatandMassBalance"],
      Calculations: ["EquipmentSizing"],
      Drawings: ["PFD", "P_OR_ID"],
      Documents: ["Specifications", "DataSheets"],
      General: ["Coordination", "Meetings"],
    },
    PipingORPipeline: {
      Lists: ["LineList", "MTO1"],
      Calculations: ["LineSizing", "PipeStress"],
      Drawings: ["EquipmentLayout", "PipingLayout"],
      Documents: ["Specifications", "DataSheets"],
      General: ["Coordination", "Meetings"],
      Task: ["Three_D_Model"],
    },
    Mechanical: {
      Lists: ["MTO"],
      Calculations: ["EquipmentSizing"],
      Documents: ["Specifications", "DataSheets"],
      General: ["Coordination", "Meetings"],
    },
    Electrical: {
      Drawings: [
        "SingleLineDrawings",
        "SchematicDrawings",
        "EquipmentLayouts",
        "Lighting1",
        "Earthing1",
        "CableTrayORConduit1",
        "LightningProtection1",
      ],
      Calculations: [
        "CableSizing",
        "Lighting",
        "Earthing",
        "EquipmentSizing1",
        "PowerSystemCalculations",
        "LightningProtection",
        "CableTrayORConduit2",
      ],
      Lists: ["MTO", "LoadList", "CableSchedule", "InterfaceSchedule"],
      Documents: ["Specifications", "DataSheets"],
      General: ["Coordination", "Meetings"],
      Task: ["ThreeDModel"],
    },

    Instrumentation: {
      Lists: [
        "MTO",
        "I_OR_Olist",
        "InstrumentList",
        "CableSchedule1",
        "InterfaceSchedule1",
      ],
      Calculations: ["Instruments"],
      Documents: ["Specifications", "DataSheets"],
      Drawings: [
        "InstrumentLayout",
        "SchematicDrawings",
        "CableTrayORConduit",
        "LoopDrawings",
        "Equipments",
      ],
      General: ["Coordination", "Meetings"],
      Task: ["Three_D_Model"],
    },
    CivilORStructural: {
      Lists: ["MTO_OR_BOQ", "BarBendingSchedule"],
      Calculations: ["SubStructure", "SuperStructure"],
      Documents: ["Specifications", "DataSheets", "Reports"],
      Drawings: [
        "GeneralArrangement",
        "StructuralDrawings",
        "FoundationLayout",
      ],
      General: ["Coordination", "Meetings"],
      Task: ["Three_D_Model"],
    },
    Architectural: {
      Documents: ["Specifications"],
      Drawings: ["Layout"],
      General: ["Coordination", "Meetings"],
      Task: ["Three_D_Model"],
    },
    HVAC: {
      Calculations: ["AirFLow", "Duct"],
      Documents: ["Specifications", "DataSheets"],
      Drawings: ["Layout"],
      General: ["Coordination", "Meetings"],
    },
    Telecom: {
      Documents: ["Specifications", "DataSheets"],
      Drawings: ["Layout"],
      General: ["Coordination", "Meetings"],
    },
    HSE: {
      Calculations: ["EquipmentSizing"],
      Documents: ["Specifications", "DataSheets"],
      Drawings: ["Layout"],
      General: ["Coordination", "Meetings"],
    },
    HumanResource: {
      General: ["Coordination", "Meetings", "Training", "Leave"],
    },
    Account: {
      General: ["Coordination", "Meetings"],
    },
    Administration: {
      General: ["Coordination", "Meetings"],
    },
    BusinessDevelopment: {
      Documents: ["Proposals"],
      General: ["Coordination", "Meetings"],
    },
    Procurement: {
      Documents: ["Proposals"],
      General: ["Coordination", "Meetings"],
    },
    Construction: {
      Documents: ["DocReviews"],
      General: ["CoordinationORSupervision", "Meetings"],
    },
    NavalArchitecture: {
      Lists: ["MTO"],
      Calculations: [
        "MooringAnalysis",
        "FEA_OR_CFD",
        "MaxsurfStability",
        "NavalArchCalcs",
        "SacsOffshore",
        "EquipmentSizing2",
      ],
      Drawings: [
        "StructuralDrawings",
        "MooringLayout",
        "EquipmentLayouts",
        "Schematics",
      ],
      Documents: ["Report", "DataSheets"],
      General: ["Coordination", "Meetings"],
      Assembly: ["Electrical", "Mechanical"],
      Coding: ["Testing", "Algorithm"],
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
                <option value="ProjectManagement">Project Management</option>
                <option value="Mechanical">Mechanical</option>
                <option value="NavalArchitecture">Naval Architecture</option>
                <option value="PipingORPipeline">Piping/Pipeline</option>
                <option value="Process">Process</option>
                <option value="Procurement">Procurement</option>
                {/* <option value="Projects">Projects</option> */}
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
                      (sub) => {
                        const label = sub.replace(/\d+$/, ""); // removes any trailling digits
                        return (
                          <option key={sub} value={sub}>
                            {label}
                          </option>
                        );
                      }
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
