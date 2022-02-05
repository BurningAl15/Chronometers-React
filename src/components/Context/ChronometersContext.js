import React, { createContext, useState } from "react";

export const ChronometersContext = createContext();

export const ChronometersProvider = ({ children }) => {
  const [chronometers, setChronometers] = useState([]);

  const AddChronometer = (e) => {
    const tempChronometers = [...chronometers];
    // const tempId = tempChronometers.length;
    const tempId = new Date().valueOf();

    tempChronometers.push({
      id: tempId,
      title: "",
      project: "",
      isLoading: false,
    });
    // console.table(tempChronometers);
    setChronometers(tempChronometers);
    e.preventDefault();
  };

  const RemoveChronometer = (id) => {
    let tempChronometers = [...chronometers];
    tempChronometers = tempChronometers.filter((value) => value.id !== id);
    setChronometers(tempChronometers);
  };

  const EditChronometer = (id, titleContent, projectContent) => {
    let tempChronometers = [...chronometers];
    tempChronometers = tempChronometers.map((value) => {
      if (value.id === id) {
        return {
          id: value.id,
          title: titleContent,
          project: projectContent,
          isActive: true,
        };
      } else {
        return value;
      }
    });
    console.table(tempChronometers);
    setChronometers(tempChronometers);
  };

  return (
    <ChronometersContext.Provider
      value={{
        chronometers,
        setChronometers,
        AddChronometer,
        RemoveChronometer,
        EditChronometer,
      }}
    >
      {children}
    </ChronometersContext.Provider>
  );
};
