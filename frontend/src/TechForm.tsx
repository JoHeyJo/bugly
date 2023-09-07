import React, { useState, useEffect } from "react";
import DropMenu from "./DropMenu";
import { techGet } from './api';
import { ITech } from "./interface";
import Form from 'react-bootstrap/Form';

type TechFormProp = {
  projectTech: string[];
}

/** Renders pre-populated list of technologies in a dropdown with an option
 * to create additional "tech" options.
 * RendererInfo -> TechForm
  */

function TechForm({ projectTech }: TechFormProp) {
  console.log('projectTech', projectTech)
  const [technologies, setTechnologies] = useState<ITech[]>([{ tech: '', id: 0 }]);
  const [selected, setSelected] = useState<string[]>([]);

  /** fetches all technologies */
  useEffect(() => {
    async function fetchTech() {
      const res = await techGet();
      setTechnologies(res);
    }
    fetchTech()
  }, [])

  /** Updates selection of technologies  */
  function updateSelected(newTech: string) {
    setSelected(tech => [...tech, newTech])
  }

  /**Submits tech data */
  function submitData() {
    // setSelected([])
    console.log("data submitted")
  }

  console.log(projectTech)
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