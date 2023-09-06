import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style/DropMenu.css'
import { ITech } from './interface';
/** Dropdown menu 
 */

type DropMenuProp = {
  list: ITech[];
}

function DropMenu({ list }: DropMenuProp) {
  return (
    <DropdownButton className="custom-dropdown" id="dropdown-basic-button" variant="outline-dark" title={<FontAwesomeIcon icon={faPlus} />}>
      {list.map((item, idx) =>
        <Dropdown.Item data-bs-theme="dark" key={idx}>{item.tech}</Dropdown.Item>
      )}
    </DropdownButton>
  );
}

export default DropMenu;