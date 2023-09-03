import React, {useContext} from "react";
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
  // console.log('RenderInfo>>>>>>>>', projectId)

  return (
    <>
      <div id="RenderInfo-add">
      <PopOut id={projectId} action={"new info"} getProject={()=>{}} postId={undefined} />
    </div>
      <List list={data.projectData.details} />
    </>
  )
}

export default RenderInfo;