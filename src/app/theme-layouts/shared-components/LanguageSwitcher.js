import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";

function LanguageSwitcher(props) {

  const { t, i18n } = useTranslation();
  const [changedLang, setChangedLang] = React.useState('uz')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (_, lang) => {

    i18n.changeLanguage(lang);
    setChangedLang(lang);
    handleClose();
  }

  

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {changedLang}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(event) => changeLanguage(event, "uz")}>uz</MenuItem>
        <MenuItem onClick={(event) => changeLanguage(event, "ru")}>ru</MenuItem>
        <MenuItem onClick={(event) => changeLanguage(event, "en")}>en</MenuItem>
      </Menu>
    </>
  );
}

export default LanguageSwitcher;