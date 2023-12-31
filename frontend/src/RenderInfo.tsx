//dependencies
import React, { useState, useContext, useEffect } from "react";
//componnent/modules
import { ProjectContext } from './userContext';
import InfoList from './InfoList';
import { IDetailData } from "./interface";
import PopOut from './PopOut';
import TechList from './TechList';
// style
import './style/RenderInfo.css';
import TechForm from "./TechForm";
import SpecList from "./SpecList";

type InfoProp = {
  projectData: IDetailData
}

type Section = {
  [key: string]: boolean;
  details: boolean;
  tech: boolean;
  specs: boolean;
}

const defaultSections = { 'details': false, 'tech': false, 'specs': false }
/** Renders project's specs, tech, details 
 * DetailsSlidOver -> RenderInfo -> [PopOut, TechForm, InfoList, TechList]
*/
function RenderInfo(data: InfoProp) {
  const [section, setSection] = useState<Section>(defaultSections)

  const { projectId } = useContext(ProjectContext)

  /** updates state with selection section */
  function selectSection(e: any) {
    e.preventDefault()
    const selectedSection = e.target.name;
    setSection(section => {
      section = defaultSections;
      const toggledSection = { ...section, [selectedSection]: true }
      return toggledSection
    })
  }

  return (
    <>
      <span id="RenderInfo-add">
        <h3 className={section.details ? "RenderInfo-sections active" : "RenderInfo-sections"}>
          <button name="details"
            onClick={selectSection} className="RenderInfo-buttons">Details
          </button>
        </h3>
        <h3 className={section.tech ? "RenderInfo-sections active" : "RenderInfo-sections"}>
          <button name="tech"
            onClick={selectSection} className="RenderInfo-buttons">Tech
          </button>
        </h3>
        <h3 className={section.specs ? "RenderInfo-sections active" : "RenderInfo-sections"}>
          <button name="specs"
            onClick={selectSection} className="RenderInfo-buttons">Specs
          </button>
        </h3>
        <span style={{width: "10%"}}>
          {section.details && <PopOut id={projectId} action={"new info"} getProject={() => { }} postId={undefined} />}
          {section.tech && <TechForm projectTech={data.projectData.tech} />}
          {section.specs && <PopOut id={projectId} action={"new specs"} getProject={() => { }} postId={undefined} />}
        </span>
      </span>
      {section.details && <InfoList list={data.projectData.details} />}
      {section.specs && <InfoList list={data.projectData.specs}/>}
      {section.tech && <TechList projectId={projectId} tech={data.projectData.tech} />}
    </>
  )
}

export default RenderInfo;