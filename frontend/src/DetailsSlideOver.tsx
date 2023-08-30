import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './style/SlideOver.css';
import Card from 'react-bootstrap/Card';
import { IInfoData } from './interface';
import RenderInfo from './RenderInfo';


type DetailsSlideOverProps = {
  open: boolean;
  details: IInfoData
}

/** SlideOver component that handles rendering animation for info
 * Projects -> DetailsSlideOver
 */
function DetailsSlideOver({ open, details }: DetailsSlideOverProps) {

  return (
    <div style={{ minHeight: '150px' }}>
      <Collapse in={open} dimension="width">
        <div className='collapse-text' >
          <Card body style={{ width: '400px' }}>
            <RenderInfo projectData={details} />
          </Card>
        </div>
      </Collapse>
    </div>
  );
}

export default DetailsSlideOver;