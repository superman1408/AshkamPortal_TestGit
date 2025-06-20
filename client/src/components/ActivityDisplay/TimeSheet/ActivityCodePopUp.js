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
      Coding: "CO",
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
      Layout: "001",
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
      Projectcontrol: [
        { label: "Planning", value: "Planning" },
        { label: "Meetings", value: "Meetings" },
        { label: "Reporting", value: "Reporting" },
      ],
      ProjectEngineering: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      DocumentationControl: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    Process: {
      Lists: [
        { label: "LineList", value: "LineList" },
        { label: "Heat & MassBalance", value: "HeatandMassBalance" },
      ],
      Calculations: [{ label: "Equipment Sizing", value: "EquipmentSizing" }],
      Drawings: [
        { label: "PFD", value: "PFD" },
        { label: "P&ID", value: "P_OR_ID" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "DataSheets", value: "DataSheets" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    PipingORPipeline: {
      Lists: [
        { label: "Line List", value: "LineList" },
        { label: "MTO", value: "MTO1" },
      ],
      Calculations: [
        { label: "Line Sizing", value: "LineSizing" },
        { label: "Pipe Stress", value: "PipeStress" },
      ],
      Drawings: [
        { label: "Equipment Layout", value: "EquipmentLayout" },
        { label: "Piping Layout", value: "PipingLayout" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "DataSheets", value: "DataSheets" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Task: [{ label: "3D Model", value: "Three_D_Model" }],
    },

    Mechanical: {
      Lists: [{ label: "MTO", value: "MTO" }],
      Calculations: [{ label: "Equipment Sizing", value: "EquipmentSizing" }],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "DataSheets", value: "DataSheets" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    Electrical: {
      Drawings: [
        { label: "Single Line Drawings", value: "SingleLineDrawings" },
        { label: "Schematic Drawings", value: "SchematicDrawings" },
        { label: "Equipment Layouts", value: "EquipmentLayouts" },
        { label: "Lighting", value: "Lighting1" },
        { label: "Earthing", value: "Earthing1" },
        { label: "Cable Tray/Conduit", value: "CableTrayORConduit1" },
        { label: "Lightning Protection", value: "LightningProtection1" },
      ],
      Calculations: [
        { label: "Cable Sizing", value: "CableSizing" },
        { label: "Lighting", value: "Lighting" },
        { label: "Earthing", value: "Earthing" },
        { label: "Equipment Sizing", value: "EquipmentSizing1" },
        {
          label: "Power System Calculations",
          value: "PowerSystemCalculations",
        },
        { label: "Lightning Protection", value: "LightningProtection" },
        { label: "Cable Tray/Conduit", value: "CableTrayORConduit2" },
      ],
      Lists: [
        { label: "MTO", value: "MTO" },
        { label: "LoadList", value: "LoadList" },
        { label: "Cable Schedule", value: "CableSchedule" },
        { label: "Interface Schedule", value: "InterfaceSchedule" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "DataSheets", value: "DataSheets" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Task: [{ label: "3D Model", value: "ThreeDModel" }],
    },

    Instrumentation: {
      Lists: [
        { label: "MTO", value: "MTO" },
        { label: "I/O list", value: "I_OR_Olist" },
        { label: "Instrument List", value: "InstrumentList" },
        { label: "Cable Schedule", value: "CableSchedule1" },
        { label: "Interface Schedule", value: "InterfaceSchedule1" },
      ],
      Calculations: [{ label: "Instruments", value: "Instruments" }],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
      ],
      Drawings: [
        { label: "Instrument Layout", value: "InstrumentLayout" },
        { label: "Schematic Drawings", value: "SchematicDrawings" },
        { label: "Cable Tray/Conduit", value: "CableTrayORConduit" },
        { label: "Loop Drawings", value: "LoopDrawings" },
        { label: "Equipments", value: "Equipments" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Task: [{ label: "3D Model", value: "Three_D_Model" }],
    },

    CivilORStructural: {
      Lists: [
        { label: "MTO/BOQ", value: "MTO_OR_BOQ" },
        { label: "Bar Bending Schedule", value: "BarBendingSchedule" },
      ],
      Calculations: [
        { label: "Sub Structure", value: "SubStructure" },
        { label: "Super Structure", value: "SuperStructure" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
        { label: "Reports", value: "Reports" },
      ],
      Drawings: [
        { label: "General Arrangement", value: "GeneralArrangement" },
        { label: "Structural Drawings", value: "StructuralDrawings" },
        { label: "Foundation Layout", value: "FoundationLayout" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Task: [{ label: "3D Model", value: "Three_D_Model" }],
    },

    Architectural: {
      Documents: [{ label: "Specifications", value: "Specifications" }],
      Drawings: [{ label: "Layout", value: "Layout" }],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Task: [{ label: "3D Model", value: "Three_D_Model" }],
    },

    HVAC: {
      Calculations: [
        { label: "Air flow", value: "Airflow" },
        { label: "Duct", value: "Duct" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
      ],
      Drawings: [{ label: "Layout", value: "Layout" }],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    Telecom: {
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
      ],
      Drawings: [{ label: "Layout", value: "Layout" }],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    HSE: {
      Calculations: [{ label: "Equipment Sizing", value: "EquipmentSizing" }],
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
      General: ["Meetings"],
    },

    Construction: {
      Documents: [{ label: "Doc Reviews", value: "DocReviews" }],
      General: [
        {
          label: "Coordination/Supervision",
          value: "CoordinationORSupervision",
        },
        { label: "Meetings", value: "Meetings" },
      ],
    },

    NavalArchitecture: {
      Lists: [{ label: "MTO", value: "MTO" }],
      Calculations: [
        { label: "Mooring Analysis", value: "MooringAnalysis" },
        { label: "FEA/CFD", value: "FEA_OR_CFD" },
        { label: "Maxsurf Stability", value: "MaxsurfStability" },
        { label: "Naval Arch Calcs", value: "NavalArchCalcs" },
        { label: "Sacs Offshore", value: "SacsOffshore" },
        { label: "Equipment Sizing", value: "EquipmentSizing2" },
      ],
      Drawings: [
        { label: "Structural Drawings", value: "StructuralDrawings" },
        { label: "Mooring Layout", value: "MooringLayout" },
        { label: "Equipment Layouts", value: "EquipmentLayouts" },
        { label: "Schematics", value: "Schematics" },
      ],
      Documents: [
        { label: "Report", value: "Report" },
        { label: "DataSheets", value: "DataSheets" },
      ],
      General: [
        { label: "Coordination", value: "Coordination" },
        { label: "Meetings", value: "Meetings" },
      ],
      Assembly: [
        { label: "Electrical", value: "Electrical" },
        { label: "Mechanical", value: "Mechanical" },
      ],
      Coding: [
        { label: "Testing", value: "Testing" },
        { label: "Algorithm", value: "Algorithm" },
      ],
    },
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
            <h5 className="modal-title">Activity Code</h5>
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
                        const value = typeof sub === "string" ? sub : sub.value;
                        const label =
                          typeof sub === "string"
                            ? sub
                            : sub.label || sub.value;

                        return (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        );
                      }
                    )}
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
