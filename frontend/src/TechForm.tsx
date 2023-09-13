import React, { useState, useEffect, useContext } from "react";
import DropMenu from "./DropMenu";
import { techGet, infoPost } from './api';
import { ITech } from "./interface";
import Form from 'react-bootstrap/Form';
import { ProjectContext } from "./userContext";

type TechFormProp = {
  projectTech: ITech[];
}

/** Processes data for dropdown and holds state for technologies available and technologies
 * selected. Data processed => {tech:[{},{},{}...]}
 * 
 * Props:
 * - projectTech => array of Tech objects
 * 
 * State:
 * - technologies - existing choices of tech
 * - selected - tech that has been assigned to corresponding project.
 *   Includes previously assigned and currently assigned tech which is reflected in dropdown by being disabled from selection.
 * 
 * RendererInfo -> TechForm
  */

function TechForm({ projectTech }: TechFormProp) {
  const [technologies, setTechnologies] = useState<ITech[]>([{ tech: '', id: 0 }]);
  const [selected, setSelected] = useState<ITech[]>([]);

  const { projectId } = useContext(ProjectContext);

  /** fetches all technologies */
  useEffect(() => {
    async function fetchTech() {
      const res = await techGet();
      setTechnologies(res);
    }
    fetchTech()
  }, [])

  /** Updates state with placeholder so that newly created techs can be shown in UI w/o needless server request.  */
  function updateSelected(newTech: ITech) {
    let tempTech = newTech;
    if (newTech.id === undefined) tempTech = { ...newTech, id: 0 };
    /* tech ID placeholder id if it doesn't exists so that it can properly be rendered in dropdown. 
    techId=0 - allows tech name it be rendered
    itechId=undefined - means it's newly created and 'create...' will render instead of the tech name.
    */
    setSelected(tech => [...tech, tempTech])
    setTechnologies(tech => [...tech, tempTech])
  }

  /**Submits tech data */
  async function submitData() {
    // await infoPost(projectId, { "tech": selected })
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