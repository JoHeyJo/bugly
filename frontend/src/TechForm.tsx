import React, { useState, useEffect } from "react";
import DropMenu from "./DropMenu";
import { techGet, infoPost } from './api';
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
    const placeHolderTech = { ...newTech, id: 0 };
    setSelected(tech => [...tech, placeHolderTech])
    setTechnologies(tech => [...tech, placeHolderTech])
  }

  /**Submits tech data */
  async function submitData() {
    // await infoPost()
    console.log("data submitted")
  }


  useEffect(() => setSelected(projectTech), [projectTech])

  return (
    <>
      <Form>
        <DropMenu submit={submitData} selected={selected} updateState={updateSelected} list={technologies} />
      </Form>
    </>
  )
}

export default TechForm;