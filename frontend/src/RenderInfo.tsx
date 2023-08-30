import React from "react";
import List from './List';
import { IInfoData } from "./interface";
import PopOut from './PopOut';
import './style/RenderInfo.css';
type InfoProp = {
  projectData: IInfoData
}
/** Renders project's specs, tech, details 
 * DetailsSlidOver -> Info
*/
function RenderInfo(data: InfoProp) {


  return (
    <>
      <div id="RenderInfo-add">
      <PopOut action={"new info"} getProject={()=>{}} postId={undefined} />
    </div>
      <List list={data.projectData.details} />
    </>
  )
}

export default RenderInfo;