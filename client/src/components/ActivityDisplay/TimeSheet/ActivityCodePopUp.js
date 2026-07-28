import { Button } from "@mui/material";
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
      // It - discipline

      InformationTechnology: "IT",
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
      Analysis: "AN",
      Modeling: "MO",
      Review: "RE",
      "Simulation/Analysis": "SA",
      "Documentation & Reporting": "DO",
      "3D Modelling": "3D-M",
      DataSheets: "DS",

      // civil

      // IT - Activities
      // Analysis: "AN",
      Development: "DV",
      Testing: "TS",
      Infrastructure: "IN",
      "System Support": "SS",
      Security: "SC",
      Deployment: "DP",
      Documentation: "DO",
      "Graphic Design": "GD",
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
      Duct_Sizing: "002",
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
      Idle: "005",
      Layout: "001",
      // Leave: "004",
      Lighting: "005",
      Lighting1: "006",
      LightningProtection: "006",
      LightningProtection1: "007",
      LineList: "002",
      LineSizing: "001",
      LoadList: "002",
      LoopDrawings: "004",
      MaxsurfStability: "003",
      Mechanical: "002",
      Meetings: "002",
      MooringLayout: "003",
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
      Three_D_Model: "001",

      // Addition

      // Common sub activities

      Client_Meeting: "001",
      Vendor_Meeting: "002",
      Internal_Meeting: "003",
      External_Meeting: "004",

      Client_Coordination: "005",
      Interdisciplinary_Coordination: "006",
      RFI_Clarification: "007",
      Change_Order_Management: "008",

      Outdoor_Site_Visit: "009",

      Presentation: "010",
      Seminar: "011",
      Training: "012",
      Self_Study: "013",
      Case_Study: "014",

      Review: "015",
      Documentation: "016",

      Leave: "017",

      DCI: "003",
      MOM: "004",
      Scheduling_and_Planning: "005",
      Rate_Analysis: "006",
      Inventory: "007",
      Manual_Calcualtion: "001",
      Foundation_Design: "002",
      Member_Design: "003",
      Sub_Structure: "001",
      Super_Structure: "002",
      Misc_Structure: "003",
      STAAD_Modeling: "001",
      Auto_CAD_3D_Modeling: "002",
      Civil_Design_Basis: "001",
      STRL_Design_Basis: "002",
      Design_Report: "003",
      Feseability_Report: "004",
      Site_Report: "005",
      QAP_Report: "006",
      Specification: "007",
      Documentaion: "008",
      Data_Sheet: "009",
      Civil_Reinf_Drawing: "004",
      Fabrication_Drawing: "005",
      As_Built_Drawing: "006",
      Drawing_Review: "001",
      Document_Review: "002",
      Construction_Activity_Review: "003",

      Process_Simulation: "001",
      Hydraulic_Analysis: "002",
      Equip_List: "001",
      Line_List: "002",
      Utility_summary_List: "003",
      Equipment_Sizing: "001",
      Hydraulic_Calculations: "002",
      PSV_Sizing: "003",
      Control_Valve_Sizing: "004",
      Utility_Capacity_Calculation: "005",
      Calculations_Review: "006",
      Process_Design_Basis: "001",
      H_and_MB: "003",
      Hydraulic_Report: "002",
      Process_Datasheets: "004",
      Pipeline_Size_Selection_Report: "005",
      Operation_And_Control_Philosophy: "006",
      Overpressure_Protection_Philosophy: "007",
      Cause_And_Effect_Diagram: "008",
      HAZARDOUS_AREA_CLASSIFICATION_REPORT: "009",
      HAZOP_HAZID_Support: "010",
      Emergency_Shutdown_Philosophy: "011",
      commissioning_and_Commissioning_Report: "012",
      Installation_Operation_and_Maintance_Manual: "013",
      Specification_Packages: "014",
      Block_flow_diagram: "001",
      Process_Flow_Diagram: "002",
      P_and_ID: "003",
      Plot_Plan_Equipment_Layout: "004",
      Vendor_Document_Review: "001",
      Internal_Document_Review: "002",

      Architectural_BOQ_MTO: "001",
      Material_Selection: "002",
      Area_Calculations: "001",
      Calculations_Review_Ar: "002",
      Architectural_Design_Basis: "002",
      Design_Proposal_Presentation: "003",
      Conceptual_Design: "002",
      GA_Drawing: "001",
      Architectural_Drawing: "003",
      Presentation_Drawing: "004",
      Equipment_Furniture_Layout: "005",
      Working_Drawings: "006",
      Three_D_Modelling_Interior_Exterior: "001",
      Three_D_Rendering: "002",
      Walkthrough: "003",
      BOQ: "002",
      Calculation: "003",
      Psychrometric: "003",
      Heat_Load: "004",
      Equipment_Sizing_Na: "005",
      Linkedin_Post: "003",
      Report_Hvac: "005",
      Equipment_Layout: "004",
      Presentaion: "003",
      Reliability: "007",
      Schematics_Na: "005",
      Ship_Vessel: "001",
      Offsore: "002",
      Onshore: "004",
      Bid_Documents: "006",
      Wall_Thickness_Analysis: "001",
      BOQ_Pi: "003",
      MR: "004",
      BOM: "005",
      Schedule_List: "006",
      Manhours: "007",
      Proposal: "008",
      BID: "009",

      Wall_Thickness_Calculation: "001",
      On_Bottom_Roughness: "002",
      On_Bottom_Stability: "003",
      Pipe_Soil_Interaction: "004",
      Free_Span: "005",
      Cathodic_Protection: "006",
      Expansion_Analysis: "007",
      Crossing_Calculation: "008",
      Stress_Analysis: "009",
      Surge_Analysis: "010",
      Pipelay_Analysis: "011",
      Hydraulic: "012",
      Buoyancy_Calculation: "013",
      Equipment_Sizing_Pi: "014",

      Pipeline_General_Note_And_Drawing_Index: "001",
      Field_Layout_Drawing: "002",
      Typical_Anode_Detail_Drawing: "003",
      Pipeline_Route_Drawing: "004",
      Alignment_Sheets_For_Pipelines_Drawings: "005",
      PLEM_Approach_Drawing: "006",
      PLEM_Tie_In_Spool_Drawing: "007",
      Shore_Approach_Drawing: "008",
      Additional_Stabilization_Drawing: "009",
      Trench_And_Backfill_Drawing: "010",
      Crossing_Detail_Drawing: "011",
      Pipeline_Stress_Analysis_Report: "012",
      Anchor_Thrust_Block_Drawings_If_Required: "013",
      Pipeline_Installation_Analysis_Report: "014",
      Tie_In_Details: "015",
      Battery_Limit_Drawing: "016",

      Design_Basis: "001",
      Stress_Report: "003",
      Surge_Report: "004",
      Pipeline_Wall_Thickness_Report: "005",
      Pipeline_On_Bottom_Stability_Analysis_Report: "006",
      Pipeline_Expansion_Analysis_Report: "007",
      Free_Span_Analysis_Report: "008",
      Pipeline_And_Soil_Interaction_Report: "009",
      Pipeline_Design_Global_Buckling_And_Walking_Analysis_Design_Report: "010",
      Pipeline_On_Bottom_Roughness_Analysis_And_Report: "011",
      Cathodic_Protection_System_Design_Report: "012",
      Crossing_Design_Analysis_And_Report: "013",
      Specification_For_Line_Pipe: "014",
      Specification_For_Fittings: "015",
      Specification_For_Bend: "016",
      Specification_For_Valves: "017",
      Specification_For_Painting_And_Protective_Coating: "018",
      Specification_For_Pipeline_Cleaning_Flushing_And_Flooding: "019",
      Specification_For_Pipeline_Crossing: "020",
      Specification_For_Free_Span_Correction: "021",
      Specification_For_Anti_Corrosion_Coating: "022",
      Specification_For_Cathodic_Protection_And_Sacrificial_Anodes: "023",
      Specification_For_Offshore_Trenching_And_Backfilling: "024",
      Specification_For_Field_Joint_Coating: "025",
      Specification_For_Pipeline_Welding: "026",

      Sacrificial_Anode: "001",
      Flanges_And_Fittings: "002",
      Bends: "003",
      Linepipe: "004",
      Valves: "005",

      Report_Review: "004",

      //IT - SubActivities-Codes
      // RouterORSwitchConfig: "001",
      // Cabling: "002",
      // NetworkMaintenanceTroubleshooting: "003",
      // HardwareORInstallation: "001",
      // SoftwareInstallationUpdates: "002",
      // HardwareTroubleshooting: "003",
      // SocialMediaPost: "001",
      // MarketingCollateralLayoutDesign: "002",
      // BusinessDevelopmentMaterial: "003",
      // PresentationAndDocumentation: "004",
      // WebsiteContentUpdate: "001",
      // WebsiteUI_UXEnhancement: "002",
      // WebsiteBugFixes_Maintenance: "003",
      // Antivirus_FirewallSetup: "001",
      // SecurityAudit_Monitoring: "002",
      // DataBackup_Recovery: "003",
      // RequirementAnalysis: "001",
      // BackendDevelopment: "002",
      // FrontendDevelopment: "003",
      // Testing_Debugging: "004",
      // Deployment_Maintenance: "005",
      // ServerHostingSetup: "001",
      // DatabaseConfiguration: "002",
      // CloudServiceIntegration: "003",
      // InternalMeeting_Documentation: "001",
      // Training_KnowledgeSharing: "002",
      // VendorCoordination_Procurement: "003",

      Requirement_Analysis: "001",
      System_Analysis: "002",
      Database_Design: "003",
      UI_UX_Design: "004",
      Frontend_Development: "001",
      Backend_Development: "002",
      API_Development: "003",
      Database_Development: "004",
      Website_Development: "005",
      Unit_Testing: "001",
      Integration_Testing: "002",
      Bug_Fixing: "003",
      Performance_Testing: "004",
      Hardware_Installation: "001",
      Software_Installation: "002",
      System_Maintenance: "003",
      Technical_Support: "004",
      Troubleshooting: "005",
      Firewall_Configuration: "001",
      Security_Audit: "002",
      Data_Backup: "003",
      Disaster_Recovery: "004",
      Application_Deployment: "001",
      Server_Deployment: "002",
      Release_Management: "003",
      Technical_Documentation: "001",
      User_Documentation: "002",
      Training_Material: "003",
      UI_Design: "001",
      Social_Media_Design: "002",
      Marketing_Material: "003",
      Presentation_Design: "004",
      Code_Review: "001",
      Design_Review: "002",
      Testing_Review: "004",

      Interdepartmental_Coordination: "004",
      Research_And_Learning: "005",
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
      "Simulation/Analysis": [
        { label: "Process Simulation", value: "Process_Simulation" },
        { label: "Hydraulic Analysis", value: "Hydraulic_Analysis" },
      ],
      Lists: [
        { label: "Equip. List", value: "Equip_List" },
        { label: "LineList", value: "Line_List" },
        { label: "Utility summary List", value: "Utility_summary_List" },
      ],
      Calculations: [
        { label: "Equipment Sizing", value: "Equipment_Sizing" },
        { label: "Hydraulic Calculations", value: "Hydraulic_Calculations" },
        { label: "PSV Sizing", value: "PSV_Sizing" },
        { label: "Control Valve Sizing", value: "Control_Valve_Sizing" },
        {
          label: "Utility Capacity Calculationg",
          value: "Utility_Capacity_Calculation",
        },
        { label: "Calculations Review", value: "Calculations_Review_Ar" },
      ],
      "Documentation & Reporting": [
        { label: "Process Design Basis", value: "Process_Design_Basis" },
        { label: "Hydraulic report", value: "Hydraulic_Report" },
        { label: "H&MB", value: "H_and_MB" },
        { label: "Process Datasheets", value: "Process_Datasheets" },
        {
          label: "Pipeline Size Selection Report",
          value: "Pipeline_Size_Selection_Report",
        },
        {
          label: "Operation And Control Philosophy",
          value: "Operation_And_Control_Philosophy",
        },
        {
          label: "Overpressure Protection Philosophy",
          value: "Overpressure_Protection_Philosophy",
        },
        {
          label: "Cause And Effect Diagram",
          value: "Cause_And_Effect_Diagram",
        },
        {
          label: "HAZARDOUS AREA CLASSIFICATION REPORT",
          value: "HAZARDOUS_AREA_CLASSIFICATION_REPORT",
        },
        { label: "HAZOP/HAZID Support", value: "HAZOP_HAZID_Support" },
        {
          label: "Emergency Shutdown Philosophy",
          value: "Emergency_Shutdown_Philosophy",
        },
        {
          label: "Pre-commissioning & Commissioning Report ",
          value: "Pre-commissioning_and_Commissioning_Report ",
        },
        {
          label: "Installation Operation & Maintance Manual",
          value: "Installation_Operation_and_Maintance_Manual",
        },
        { label: "Specification - Packages", value: "Specification_Packages" },
      ],
      Drawings: [
        { label: "Block Flow Diagram", value: "Block_flow_diagram" },
        { label: "Process Flow Diagram", value: "Process_Flow_Diagram" },
        { label: "P&ID", value: "P_and_ID" },
        {
          label: "Plot Plan/Equipment layout",
          value: "Plot_Plan_Equipment_Layout",
        },
      ],

      Review: [
        { label: "Vendor Document Review", value: "Vendor_Document_Review" },
        {
          label: "Internal Document Review",
          value: "Internal_Document_Review",
        },
      ],

      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/site Visit", value: "Outdoor_site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Self-Study", value: "Self_Study" },
        { label: "Leave", value: "Leave" },
      ],
    },

    PipingORPipeline: {
      "Simulation/Analysis": [
        {
          label: "Wall Thickness Calculation ",
          value: "Wall_Thickness_Calculation ",
        },

        { label: "On-Bottom Roughness", value: "On_Bottom_Roughness" },
        { label: "On-Bottom Stability", value: "On_Bottom_Stability" },
        { label: "Pipe Soil Interaction", value: "Pipe_Soil_Interaction" },
        { label: "Free Span", value: "Free_Span" },
        { label: "Cathodic Protection", value: "Cathodic_Protection" },
        { label: "Expansion Analysis", value: "Expansion_Analysis" },
        { label: "Crossing Calculation", value: "Crossing Calculation" },
        { label: "Stress Analysis", value: "Stress_Analysis" },
        { label: "Surge Analysis", value: "Surge_Analysis" },
        { label: "Pipelay Analysis", value: "Pipelay_Analysis" },
        { label: "Hydraulic Analysis", value: "Hydraulic" },
      ],
      Lists: [
        { label: "Equip. list", value: "Equip_list" },
        { label: "Line List", value: "Line_List" },
        { label: "BOQ", value: "BOQ_Pi" },
        { label: "MR", value: "MR" },
        { label: "BOM", value: "BOM" },
        { label: "Schedule List", value: "Schedule_List" },
        { label: "Manhours", value: "Manhours" },
        { label: "Proposal", value: "Proposal" },
        { label: "BID", value: "BID" },
      ],
      Calculations: [
        {
          label: "Wall Thickness Calculation",
          value: "Wall_Thickness_Calculation",
        },
        { label: "On-Bottom Roughnes", value: "On_Bottom_Roughness" },
        { label: "On-Bottom Stability", value: "On_Bottom_Stability" },
        { label: "Pipe Soil Interaction", value: "Pipe_Soil_Interaction" },
        { label: "Free Span", value: "Free_Span" },
        { label: "Cathodic Protection", value: "Cathodic_Protection" },
        { label: "Expansion Analysis", value: "Expansion_Analysis" },
        { label: "Crossing Calculation", value: "Crossing_Calculation" },
        { label: "Stress Analysis", value: "Stress_Analysis" },
        { label: "Surge Analysis", value: "Surge_Analysis" },
        { label: "Pipelay Analysis", value: "Pipelay_Analysis" },
        { label: "Hydraulic Calculations", value: "Hydraulic" },
        { label: "Buoyancy Calculation", value: "Buoyancy_Calculation" },
        { label: "Equipment Sizing", value: "Equipment_Sizing_Pi" },
      ],
      Drawings: [
        {
          label: "Pipeline General Note And Drawing Index",
          value: "Pipeline_General_Note_And_Drawing_Index",
        },
        {
          label: "Field Layout Drawing",
          value: "Field_Layout_Drawing",
        },
        {
          label: "Typical Anode Detail Drawing",
          value: "Typical_Anode_Detail_Drawing",
        },
        {
          label: "Pipeline Route Drawing",
          value: "Pipeline_Route_Drawing",
        },
        {
          label: "Alignment Sheets For Pipelines Drawings",
          value: "Alignment_Sheets_For_Pipelines_Drawings",
        },
        {
          label: "PLEM Approach Drawing",
          value: "PLEM_Approach_Drawing",
        },
        {
          label: "PLEM Tie-In Spool Drawing",
          value: "PLEM_Tie_In_Spool_Drawing",
        },
        {
          label: "Shore Approach Drawing",
          value: "Shore_Approach_Drawing",
        },
        {
          label: "Additional Stabilization Drawing",
          value: "Additional_Stabilization_Drawing",
        },
        {
          label: "Trench & Backfill Drawing",
          value: "Trench_And_Backfill_Drawing",
        },
        {
          label: "Crossing Detail Drawing",
          value: "Crossing_Detail_Drawing",
        },
        {
          label: "Pipeline Stress Analysis Report",
          value: "Pipeline_Stress_Analysis_Report",
        },
        {
          label: "Anchor/Thrust Block Drawings (If Required)",
          value: "Anchor_Thrust_Block_Drawings_If_Required",
        },
        {
          label: "Pipeline Installation Analysis Report",
          value: "Pipeline_Installation_Analysis_Report",
        },
        {
          label: "Tie-In Details",
          value: "Tie_In_Details",
        },
        {
          label: "Battery Limit Drawing",
          value: "Battery_Limit_Drawing",
        },
      ],
      "Documentation & Reporting": [
        { label: "Design Basis", value: "Design_Basis" },
        { label: "Hydraulic Report", value: "Hydraulic_Report" },
        { label: "Stress Report", value: "Stress_Report" },
        { label: "Surge Report", value: "Surge_Report" },
        {
          label: "Pipeline Wall Thickness Report",
          value: "Pipeline_Wall_Thickness_Report",
        },
        {
          label: "Pipeline On-Bottom Stability Analysis Report",
          value: "Pipeline_On_Bottom_Stability_Analysis_Report",
        },
        {
          label: "Pipeline Expansion Analysis Report",
          value: "Pipeline_Expansion_Analysis_Report",
        },
        {
          label: "Free Span Analysis Report",
          value: "Free_Span_Analysis_Report",
        },
        {
          label: "Pipeline And Soil Interaction Report",
          value: "Pipeline_And_Soil_Interaction_Report",
        },
        {
          label:
            "Pipeline Design Global Buckling And Walking Analysis Design Report",
          value:
            "Pipeline_Design_Global_Buckling_And_Walking_Analysis_Design_Report",
        },
        {
          label: "Pipeline On-Bottom Roughness Analysis And Report",
          value: "Pipeline_On_Bottom_Roughness_Analysis_And_Report",
        },
        {
          label: "Cathodic Protection System Design Report",
          value: "Cathodic_Protection_System_Design_Report",
        },
        {
          label: "Crossing Design Analysis And Report",
          value: "Crossing_Design_Analysis_And_Report",
        },
        {
          label: "Specification For Line Pipe",
          value: "Specification_For_Line_Pipe",
        },
        {
          label: "Specification For Fittings",
          value: "Specification_For_Fittings",
        },
        {
          label: "Specification For Bend",
          value: "Specification_For_Bend",
        },
        {
          label: "Specification For Valves",
          value: "Specification_For_Valves",
        },
        {
          label: "Specification For Painting and Protective Coating",
          value: "Specification_For_Painting_And_Protective_Coating",
        },
        {
          label: "Specification For Pipeline Cleaning - Flushing and Flooding",
          value: "Specification_For_Pipeline_Cleaning_Flushing_And_Flooding",
        },
        {
          label: "Specification For Pipeline Crossing",
          value: "Specification_For_Pipeline_Crossing",
        },
        {
          label: "Specification For Free Span Correction",
          value: "Specification_For_Free_Span_Correction",
        },
        {
          label: "Specification For Anti-Corrosion Coating",
          value: "Specification_For_Anti_Corrosion_Coating",
        },
        {
          label: "Specification For Cathodic Protection And Sacrificial Anodes",
          value: "Specification_For_Cathodic_Protection_And_Sacrificial_Anodes",
        },
        {
          label: "Specification For Offshore Trenching And Backfilling",
          value: "Specification_For_Offshore_Trenching_And_Backfilling",
        },
        {
          label: "Specification For Field Joint Coating",
          value: "Specification_For_Field_Joint_Coating",
        },
        {
          label: "Specification For Pipeline Welding",
          value: "Specification_For_Pipeline_Welding",
        },
      ],
      DataSheets: [
        {
          label: "Sacrificial Anode",
          value: "Sacrificial_Anode",
        },
        {
          label: "Flanges And Fittings",
          value: "Flanges_And_Fittings",
        },
        {
          label: "Bends",
          value: "Bends",
        },
        {
          label: "Linepipe",
          value: "Linepipe",
        },
        {
          label: "Valves",
          value: "Valves",
        },
      ],
      Review: [
        { label: "Vendor Document Review", value: "Vendor_Document_Review" },
        {
          label: "Internal Document review",
          value: "Internal_Document_Review",
        },
        { label: "Drawing Review", value: "Drawing_Review" },
        { label: "Report Review", value: "Report_Review" },
      ],
      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/Site Visit", value: "Outdoor_Site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Self-Study", value: "Self_Study" },
        { label: "Leave", value: "Leave" },
      ],
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
        { label: "Schematic Drawings", value: "Schematics" },
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
        { label: "MTO/BOQ", value: "MTO_OR_BOQ", code: "001" },
        { label: "Bar Bending Schedule", value: "BarBendingSchedule" },
        { label: "DCI", value: "DCI" },
        { label: "MOM", value: "MOM" },
        { label: "Scheduling & Planning", value: "Scheduling_and_Planning" },
        { label: "Rate Analysis", value: "Rate_Analysis" },
        { label: "Inventory", value: "Inventory" },
      ],
      Calculations: [
        { label: "Manual Calcualtion", value: "Manual_Calcualtion" },
        { label: "Foundation Design", value: "Foundation_Design" },
        { label: "Member Design", value: "Member_Design" },
      ],
      Analysis: [
        { label: "Sub Structure", value: "Sub_Structure" },
        { label: "Super Structure", value: "Super_Structure" },
        { label: "Misc. Structure", value: "Misc_Structure" },
      ],
      Modeling: [
        { label: "STAAD Modeling", value: "STAAD_Modeling" },
        { label: "Auto CAD 3D Modeling", value: "Auto_CAD_3D_Modeling" },
      ],
      "Documentation & Reporting": [
        { label: "Civil Design Basis", value: "Civil_Design_Basis" },
        { label: "STRL. Design Basis", value: "STRL_Design_Basis" },
        { label: "Design Report", value: "Design_Report" },
        { label: "Feseability Report", value: "Feseability_Report" },
        { label: "Site Report", value: "Site_Report" },
        { label: "QAP Report", value: "QAP_Report" },
        { label: "Specification", value: "Specification" },
        { label: "Documentaion ", value: "Documentaion " },
        { label: "Data Sheet", value: "Data_Sheet" },
      ],
      Drawings: [
        { label: "General Arrangement", value: "GeneralArrangement" },
        { label: "Structural Drawings", value: "StructuralDrawings" },
        { label: "Foundation Layout", value: "FoundationLayout" },
        { label: "Civil/Reinf. Drawing", value: "Civil_Reinf_Drawing" },
        { label: "Fabrication Drawing", value: "Fabrication_Drawing" },
        { label: "As Built Drawing", value: "As_Built_Drawing" },
      ],
      Review: [
        { label: "Drawing Review", value: "Drawing_Review" },
        { label: "Document Review", value: "Document_Review" },
        {
          label: "Construction Activity Review",
          value: "Construction_Activity_Review",
        },
      ],
      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/Site Visit", value: "Outdoor_Site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Client Coordination", value: "Client_Coordination" },
        { label: "RFI Clarification", value: "RFI_Clarification" },
        {
          label: "Change Order Management",
          value: "Change_Order_Management",
        },
        {
          label: "Leave",
          value: "Leave",
        },
      ],
    },

    Architectural: {
      Lists: [
        { label: "Architectural BOQ/MTO", value: "Architectural_BOQ_MTO" },
        { label: "Material Selection", value: "Material_Selection" },
      ],
      Calculation: [
        { label: "Area Calculations", value: "Area_Calculations" },
        { label: "Calculations Review", value: "Calculations_Review" },
      ],
      "Documentation & Reporting": [
        { label: "Specifications", value: "Specifications" },
        {
          label: "Architectural Design Basis",
          value: "Architectural_Design_Basis",
        },
        {
          label: "Design Proposal/ Presentation",
          value: "Design_Proposal_Presentation",
        },
      ],
      Drawings: [
        { label: "GA Drawing", value: "GA_Drawing" },
        { label: "Conceptual Design", value: "Conceptual_Design" },
        { label: "Architectural Drawing", value: "Architectural_Drawing" },
        { label: "Presentation Drawing", value: "Presentation_Drawing" },
        {
          label: "Equipment/ Furniture Layout",
          value: "Equipment_Furniture_Layout",
        },
        { label: "Working Drawings", value: "Working_Drawings" },
      ],
      Review: [
        {
          label: "Vendor Document Review",
          value: "Vendor_Document_Review",
        },
        {
          label: "Internal Document Review",
          value: "Internal_Document_Review",
        },
      ],
      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/Site Visit", value: "Outdoor_Site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Case-Study", value: "Case_Study" },
        { label: "Self-Study", value: "Self_Study" },
        {
          label: "Training",
          value: "Training",
        },
        {
          label: "Leave",
          value: "Leave",
        },
      ],
      Task: [
        {
          label: "3D Modelling (Interior / Exterior)",
          value: "Three_D_Modelling_Interior_Exterior",
        },
        { label: "3D Rendering", value: "Three_D_Rendering" },
        { label: "Walkthrough", value: "Walkthrough" },
      ],
    },

    HVAC: {
      Lists: [
        { label: "MTO", value: "MTO" },
        { label: "BOQ", value: "BOQ" },
        { label: "DCI", value: "DCI" },
      ],
      Calculations: [
        { label: "Air flow", value: "Airflow" },
        { label: "Duct Sizing", value: "Duct_Sizing" },
        { label: "Psychrometric", value: "Psychrometric" },
        { label: "Heat Load", value: "Heat_Load" },
        { label: "Equipment Sizing", value: "Equipment_Sizing_Na" },
      ],
      Documents: [
        { label: "Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
        { label: "Linkedin Post", value: "Linkedin_Post" },
        { label: "MOM", value: "MOM" },
        { label: "Report", value: "Report_Hvac" },
        { label: "Bid Documents", value: "Bid_Documents" },
      ],

      Drawings: [
        { label: "GA Drawing", value: "GA_Drawing" },
        { label: "Schematics", value: "Schematics" },
        { label: "Piping", value: "Piping" },
        { label: "Equipment Layout", value: "Equipment_Layout" },
      ],
      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/Site Visit", value: "Outdoor_Site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Case-Study", value: "Case_Study" },
        { label: "Self-Study", value: "Self_Study" },
        {
          label: "Training",
          value: "Training",
        },
        {
          label: "Leave",
          value: "Leave",
        },
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
      General: ["Coordination", "Meetings", "Training", "Leave", "Idle"],
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
      Lists: [
        { label: "MTO", value: "MTO" },
        { label: "BOQ", value: "BOQ" },
        { label: "DCI", value: "DCI" },
      ],
      Calculations: [
        { label: "Mooring Analysis", value: "MooringAnalysis" },
        { label: "FEA/CFD", value: "FEA_OR_CFD" },
        { label: "Maxsurf Stability", value: "MaxsurfStability" },
        { label: "Naval Arch Calcs", value: "NavalArchCalcs" },
        { label: "Equipment Sizing", value: "Equipment_Sizing_Na" },
        { label: "Sacs Offshore", value: "SacsOffshore" },
        { label: "Reliability", value: "Reliability" },
      ],
      Drawings: [
        { label: "GA Drawing", value: "GA_Drawing" },
        { label: "Structural Drawings", value: "StructuralDrawings" },
        { label: "Mooring Layout", value: "MooringLayout" },
        { label: "Equipment Layouts", value: "Equipment_Layout" },
        { label: "Schematics", value: "Schematics_Na" },
      ],
      "3D Modelling": [
        { label: "Ship/Vessel", value: "Ship_Vessel" },
        { label: "Offsore", value: "Offsore" },
        { label: "Piping", value: "Piping" },
        { label: "Onshore", value: "Onshore" },
        { label: "Equipments", value: "Equipments" },
      ],
      Documents: [
        { label: "Technical Specifications", value: "Specifications" },
        { label: "Data Sheets", value: "DataSheets" },
        { label: "Linkedin Post", value: "Linkedin_Post" },
        { label: "MOM", value: "MOM" },
        { label: "Report", value: "Report_Hvac" },
        { label: "Bid Documents", value: "Bid_Documents" },
      ],
      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Vendor Meeting", value: "Vendor_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "Outdoor/Site Visit", value: "Outdoor_Site_Visit" },
        {
          label: "Interdisciplinary Coordination",
          value: "Interdisciplinary_Coordination",
        },
        { label: "Case-Study", value: "Case_Study" },
        { label: "Self-Study", value: "Self_Study" },
        {
          label: "Training",
          value: "Training",
        },
        {
          label: "Leave",
          value: "Leave",
        },
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

    //  IT Sub- Activities

    InformationTechnology: {
      Analysis: [
        { label: "Requirement Analysis", value: "Requirement_Analysis" },
        { label: "System Analysis", value: "System_Analysis" },
        { label: "Database Design", value: "Database_Design" },
        { label: "UI/UX Design", value: "UI_UX_Design" },
      ],

      Development: [
        { label: "Frontend Development", value: "Frontend_Development" },
        { label: "Backend Development", value: "Backend_Development" },
        { label: "API Development", value: "API_Development" },
        { label: "Database Development", value: "Database_Development" },
        { label: "Website Development", value: "Website_Development" },
      ],

      Testing: [
        { label: "Unit Testing", value: "Unit_Testing" },
        { label: "Integration Testing", value: "Integration_Testing" },
        { label: "Bug Fixing", value: "Bug_Fixing" },
        { label: "Performance Testing", value: "Performance_Testing" },
      ],

      Infrastructure: [
        { label: "Network Configuration", value: "Network_Configuration" },
        { label: "Server Configuration", value: "Server_Configuration" },
        { label: "Database Configuration", value: "Database_Configuration" },
        { label: "Cloud Configuration", value: "Cloud_Configuration" },
      ],

      "System Support": [
        { label: "Hardware Installation", value: "Hardware_Installation" },
        { label: "Software Installation", value: "Software_Installation" },
        { label: "System Maintenance", value: "System_Maintenance" },
        { label: "Technical Support", value: "Technical_Support" },
        { label: "Troubleshooting", value: "Troubleshooting" },
      ],

      Security: [
        { label: "Firewall Configuration", value: "Firewall_Configuration" },
        { label: "Security Audit", value: "Security_Audit" },
        { label: "Data Backup", value: "Data_Backup" },
        { label: "Disaster Recovery", value: "Disaster_Recovery" },
      ],

      Deployment: [
        { label: "Application Deployment", value: "Application_Deployment" },
        { label: "Server Deployment", value: "Server_Deployment" },
        { label: "Release Management", value: "Release_Management" },
      ],

      Documentation: [
        {
          label: "Technical Documentation",
          value: "Technical_Documentation",
        },
        { label: "User Documentation", value: "User_Documentation" },
        { label: "Training Material", value: "Training_Material" },
      ],

      "Graphic Design": [
        { label: "UI Design", value: "UI_Design" },
        { label: "Social Media Design", value: "Social_Media_Design" },
        { label: "Marketing Material", value: "Marketing_Material" },
        { label: "Presentation Design", value: "Presentation_Design" },
      ],

      Review: [
        { label: "Code Review", value: "Code_Review" },
        { label: "Design Review", value: "Design_Review" },
        { label: "Document Review", value: "Document_Review" },
        { label: "Testing Review", value: "Testing_Review" },
      ],

      General: [
        { label: "Client Meeting", value: "Client_Meeting" },
        { label: "Internal Meeting", value: "Internal_Meeting" },
        { label: "External Meeting", value: "External_Meeting" },
        {
          label: "Interdepartmental Coordination",
          value: "Interdepartmental_Coordination",
        },
        { label: "Research & Learning/Self-Study", value: "Self_Study" },
        { label: "Leave", value: "Leave" },
      ],
    },
  };

  const inputStyle = {
    width: "100%",
    height: "42px",
    padding: "0 14px",
    fontSize: "15px",
    fontFamily: "Roboto",
    color: "#16355d",
    background: "#fff",
    border: "1px solid #D5DBE5",
    borderRadius: "8px",
    outline: "none",
    transition: "all .25s",

    boxSizing: "border-box",
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
            <Button
              variant="contained"
              type="button"
              className="close"
              sx={{ background: "linear-gradient(135deg, #0d325c, #16355d)" }}
              onClick={closetoggle}
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>
          <div className="modal-body">
            <div>
              {/*_______________Discipline Code____________________  */}

              <label>Discipline</label>
              <select
                style={inputStyle}
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
                <option value="InformationTechnology">
                  Information Technology
                </option>
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
                style={inputStyle}
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
                    ),
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
                  style={inputStyle}
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
                      },
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
              <Button
                variant="contained"
                sx={{ background: "linear-gradient(135deg, #0d325c, #16355d)" }}
                onClick={appendData}
              >
                Save
              </Button>
              {/* Add additional buttons or actions if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCodePopUp;
