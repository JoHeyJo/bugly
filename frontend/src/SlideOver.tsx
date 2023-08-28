import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import './style/SlideOver.css';

function SlideOver() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Collapse in={open} dimension={'width'}>
        <div className={`collapsible-content`}>
          Anim pariatur cliche reprehenderit, Anim pariatur cliche reprehenderit, nim pariatur cliche reprehenderit, Anim pariatur cliche reprehender
        </div>
      </Collapse>
    </>
  );
}

export default SlideOver;