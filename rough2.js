// Evolve.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { todoList } from "../../../api";
import ProjectCodePopUp from "./ProjectCodePopUp";
import ActivityCodePopUp from "./ActivityCodePopUp";

const Evolve = ({ currentId }) => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    projectCode: "",
    activityCode: "",
    date: "",
    netTime: "",
    overTime: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [popupOpen, setPopupOpen] = useState({
    project: false,
    activity: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { ...formData, netTime: parseFloat(formData.netTime), overTime: parseFloat(formData.overTime) };
    // Validation code...

    clearForm();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const clearForm = () => {
    setFormData({
      projectCode: "",
      activityCode: "",
      date: "",
      netTime: "",
      overTime: "",
    });
    setEditIndex(-1);
  };

  const togglePopup = (name) => {
    setPopupOpen({ ...popupOpen, [name]: !popupOpen[name] });
  };

  return (
    <>
      {/* Form and table components */}
      <ProjectCodePopUp
        open={popupOpen.project}
        togglePopup={() => togglePopup("project")}
        setProjectCode={(value) => setFormData({ ...formData, projectCode: value })}
      />
      <ActivityCodePopUp
        open={popupOpen.activity}
        togglePopup={() => togglePopup("activity")}
        setActivityCode={(value) => setFormData({ ...formData, activityCode: value })}
      />
    </>
  );
};

export default Evolve;

// ActivityCodePopUp.jsx
import React from "react";

const ActivityCodePopUp = ({ open, togglePopup, setActivityCode }) => {
  // State and handlers...

  return (
    open && (
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
        {/* Popup content */}
      </div>
    )
  );
};

export default ActivityCodePopUp;
