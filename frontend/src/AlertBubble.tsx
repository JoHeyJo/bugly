import { useState, useRef, ReactNode } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { actionProperties } from './utils/properties';

type AlertBubbleProp = {
  action: string;
  icon?: ReactNode;
}



function AlertBubble({action, icon}: AlertBubbleProp) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button className={actionProperties[action].class} variant={actionProperties[action].variant} ref={target} onClick={() => setShow(!show)}>
        {actionProperties[action].label}
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {actionProperties[action].message}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default AlertBubble;