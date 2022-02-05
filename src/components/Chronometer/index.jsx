import React, { useState, useEffect } from "react";
import "./style.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { useContext } from "react";
import { ChronometersContext } from "../Context/ChronometersContext";

const Chronometer = ({ id, title, project }) => {
  const { RemoveChronometer, EditChronometer } =
    useContext(ChronometersContext);

  const [isEditing, setIsEditing] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isStopped, setIsStopped] = useState(true);
  const [time, setTime] = useState(0);
  const [titleInput, setTitleInput] = useState("");
  const [projectInput, setProjectInput] = useState("");

  useEffect(() => {
    let interval = null;

    if (isActive && isStopped === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isStopped]);

  const handleSubmit = (e) => {
    EditChronometer(id, titleInput, projectInput);
    setIsEditing(false);
    setIsActive(true);
    setIsStopped(false);
    e.preventDefault();
  };

  const handleChange_Title = (e) => {
    setTitleInput(e.target.value);
  };

  const handleChange_Project = (e) => {
    setProjectInput(e.target.value);
  };

  const handleEdit=()=>{
    setIsEditing(true);
    setIsActive(false);
    setIsStopped(true);

    EditChronometer(id, titleInput, projectInput);
  }

  return (
    <div className="chronometer-container">
      {isEditing || (
        <>
          <div className="chronometer-content">
            <p className="chronometer-title">{title}</p>
            <p className="chronometer-project">{project}</p>
            <p className="chronometer-data">
              <span className="digits">
                {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
              </span>
            </p>
            <div className="chronometer-options">
              <button className="delete" onClick={() => RemoveChronometer(id)}>
                <FaTrashAlt />
              </button>
              <button className="edit" onClick={handleEdit}>
                <FaEdit />
              </button>
            </div>
          </div>
          {isStopped && (
            <button
              className="chronometer-state"
              onClick={() => setIsStopped(false)}
            >
              Start
            </button>
          )}
          {!isStopped && (
            <button
              className="chronometer-state stop"
              onClick={() => setIsStopped(true)}
            >
              Stop
            </button>
          )}
        </>
      )}
      {!isEditing || (
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="input-label" htmlFor={"titleId"}>
              {"Title"}
            </label>
            <input
              name="titleId"
              className="input-content"
              type="text"
              value={titleInput}
              onChange={handleChange_Title}
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor={"projectId"}>
              {"Project"}
            </label>
            <input
              name="projectId"
              className="input-content"
              type="text"
              value={projectInput}
              onChange={handleChange_Project}
            />
          </div>

          <div className="button-container">
            <button type="submit" className="button-create">
              Create
            </button>
            <button
              type="submit"
              className="button-cancel"
              onClick={() => RemoveChronometer(id)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Chronometer;
