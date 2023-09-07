import React, { useState, useEffect } from "react";
import DropMenu from "./DropMenu";
import { techGet } from './api';
import { ITech } from "./interface";

type TechFormProp = {
  technologies: string[];
}

/** Renders pre-populated list of technologies in a dropdown with an option
 * to create additional "tech" options.
 * RendererInfo -> TechForm
  */

function TechForm() {
  const [tech, setTech] = useState<ITech[]>([{ tech: '', id: 0 }]);
  const [selected, setSelected] = useState<number[]>([]);

  /** fetches all technologies */
  useEffect(() => {
    async function fetchTech() {
      const res = await techGet();
      setTech(res);
    }
    fetchTech()
  }, [])

  /** Updates selection of technologies  */
  function updateSelected(newTech: number) {
    setSelected(tech => [...tech, newTech])
  }

  /**Submits tech data */
  function submitData(){
    console.log("data submitted")
  }

  return (
    <>
      <DropMenu submit={submitData} selected={selected} updateState={updateSelected} list={tech} />
    </>
  )
}

export default TechForm;