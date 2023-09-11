import React, { useState, useEffect } from "react";
import DropMenu from "./DropMenu";
import { techGet } from './api';
import { ITech } from "./interface";
import Form from 'react-bootstrap/Form';

type TechFormProp = {
  projectTech: ITech[];
}

/** Renders pre-populated list of technologies in a dropdown with an option
 * to create additional "tech" options.
 * RendererInfo -> TechForm
  */

function TechForm({ projectTech }: TechFormProp) {
  const [technologies, setTechnologies] = useState<ITech[]>([{ tech: '', id: 0 }]);
  const [selected, setSelected] = useState<ITech[]>([]);

  /** fetches all technologies */
  useEffect(() => {
    async function fetchTech() {
      const res = await techGet();
      setTechnologies(res);
    }
    fetchTech()
  }, [])

  /** Updates selection of technologies  */
  function updateSelected(newTech: ITech) {
    console.log('tech in tech', newTech)
    setSelected(tech => [...tech, newTech])
    setTechnologies(selected => [...selected, newTech]);
  }

  /**Submits tech data */
  function submitData() {
    // setSelected([])
    console.log("data submitted")
  }


  useEffect(()=>setSelected(projectTech),[projectTech])

  return (
    <>
    <Form>
      <DropMenu submit={submitData} selected={selected} updateState={updateSelected} list={technologies} />
    </Form>
    </>
  )
}

export default TechForm;