import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './style/SlideOver.css';
import Card from 'react-bootstrap/Card';
import { IDetailData } from './interface';
import RenderInfo from './RenderInfo';
import './style/DetailSlideOver.css';

type DetailsSlideOverProps = {
  open: boolean;
  details: IDetailData
}

/** SlideOver component that handles rendering animation for info
 * Projects -> DetailsSlideOver
 */
function DetailsSlideOver({ open, details }: DetailsSlideOverProps) {
  // console.log("DetailsSlideOVer details", details)
  return (
    <div style={{ minHeight: '150px', marginRight: "1rem" }}>
      <Collapse in={open} dimension="width">
        <div className='DetailSlideOver-content'>
          <Card body style={{ width: '600px', height:'10.938rem' }}>
            <RenderInfo projectData={details} />
          </Card>
        </div>
      </Collapse>
    </div>
  );
}

export default DetailsSlideOver; 