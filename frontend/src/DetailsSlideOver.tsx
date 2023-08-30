import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './style/SlideOver.css';
import Card from 'react-bootstrap/Card';
import { IInfoData } from './interface';
import RenderInfo from './RenderInfo';
import './style/DetailSlideOver.css';

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
        <div className='collapse-text DetailSlideOver-content' >
          <Card body style={{ width: '26rem' }}>
            <RenderInfo projectData={details} />
          </Card>
        </div>
      </Collapse>
    </div>
  );
}

export default DetailsSlideOver;