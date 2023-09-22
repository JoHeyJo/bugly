import React, { useState, useEffect } from "react";
import { ITech } from './interface'
import './style/TechList.css';
import PillButton from "./components/PIllButton";
import { techProjectDelete } from "./api";
import { errorHandling } from "./utils/errorHandling";

type TechListProp = {
  tech: ITech[];
  projectId: number | undefined;
}

/** Renders list of tech, handles removal of tech.
 * 
 * RenderInfo -> TechList
 */
function TechList({ projectId, tech }: TechListProp) {
  const [techList , setTechList] = useState<ITech[]>();

  /**Removes tech from tech list */
  function removeTech(techId:any){
    setTechList(tech.filter(t => t.id !== techId))
  }

  /**Dissociate tech from project  */
  async function deleteTechReference(techId: number | undefined) {
    try {
      await techProjectDelete(projectId, techId)
      removeTech(techId);
    } catch (error:any) {
      errorHandling("TechList -> deleteTechReference", error)
    }
  }

useEffect(()=>{
  setTechList(tech);
},[])
  return (
    <>
      <ul id="TechList-list" className="d-flex">
        {techList?.map((t, idx) =>
        <>
          <li className="px-3" key={idx}><PillButton handleAction={deleteTechReference} label={t.tech} id={t.id}/></li>
        </>
        )}
      </ul>
    </>

  );
}

export default TechList;