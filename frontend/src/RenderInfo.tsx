import React from "react";
import List from './List';
import { IInfoData } from "./interface";

type InfoProp = {
  projectData: IInfoData
}
/** Renders project's specs, tech, details 
 * DetailsSlidOver -> Info
*/
function RenderInfo(data: InfoProp) {


  return (
    <>
      <List list={data.projectData.details} />
    </>
  )
}

export default RenderInfo;