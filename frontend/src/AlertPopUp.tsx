import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type AlertProp = {
  variant: string;
  message: string[];
}
// color schemes for Alert component
// 'primary',
//   'secondary',
//   'success',
//   'danger',
//   'warning',
//   'info',
//   'light',
//   'dark',

/** Alert component that can be used for a variaty of notifications */
function AlertPopUp({ variant, message }: AlertProp) {
  const [isShowing] = useState<boolean>(true);

  return (
    <>
      {message.map((m) =>
        isShowing &&
        <Alert key={variant} variant={variant}>
          {m}
        </Alert>

      )
      }
    </>
  );
}

export default AlertPopUp;