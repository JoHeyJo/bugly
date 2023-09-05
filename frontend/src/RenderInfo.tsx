//dependencies
import React, { useState, useContext } from "react";
//componnent/modules
import { ProjectContext } from './userContext';
import DetailsList from './DetailsList';
import { IDetailData } from "./interface";
import PopOut from './PopOut';
import TechList from './TechList';
// style
import './style/RenderInfo.css';

type InfoProp = {
  projectData: IDetailData
}
/** Renders project's specs, tech, details 
 * DetailsSlidOver -> Info
*/
function RenderInfo(data: InfoProp) {
  const [section, setSection] = useState({ 'details': false, 'tech': false, 'specs': false })

  const { projectId } = useContext(ProjectContext)

  /** updates state with selection section */
  function selectSection(e:any) {
    e.preventDefault()
    const section = e.target.name;
    console.log('section', section)
    setSection(section =>{
      const toggledSection = {...section}
      return section
    })
  }

  return (
    <>
      <span id="RenderInfo-add">
        <h3 className="RenderInfo-sections">
          <button name="details"
            onClick={selectSection} className="RenderInfo-buttons">Details
          </button>
        </h3>
        <h3 className="RenderInfo-sections">
          <button name="tech"
            onClick={selectSection} className="RenderInfo-buttons">Tech
          </button>
        </h3>
        <h3 className="RenderInfo-sections">
          <button name="specs"
            onClick={selectSection} className="RenderInfo-buttons">Specs
          </button>
        </h3>
        <PopOut id={projectId} action={"new info"} getProject={() => { }} postId={undefined} />
      </span>
      <DetailsList list={data.projectData.details} />
      {/* <TechList /> */}

    </>
  )
}

export default RenderInfo;