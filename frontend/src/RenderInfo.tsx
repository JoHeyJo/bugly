import React, { useContext } from "react";
import List from './List';
import { IDetailData } from "./interface";
import PopOut from './PopOut';
import './style/RenderInfo.css';
import { ProjectContext } from './userContext';
type InfoProp = {
  projectData: IDetailData
}
/** Renders project's specs, tech, details 
 * DetailsSlidOver -> Info
*/
function RenderInfo(data: InfoProp) {

  const { projectId } = useContext(ProjectContext)

  return (
    <>
      <span id="RenderInfo-add">
        <h3>Details</h3>
        <PopOut id={projectId} action={"new info"} getProject={() => { }} postId={undefined} />
      </span>
      <List list={data.projectData.details} />
    </>
  )
}

export default RenderInfo;