import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import MultipleSelectChip from '../MultipleSelectChip';

function TaskForm() {

  useEffect(() => {
   
  }, []);


  function onSubmitNew(data) {
    
  }

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-32">
          <span>Add Product</span>
          <div className="flex items-center">
            <IconButton className="" component={NavLinkAdapter} to="/tasks" size="large">
              <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
            </IconButton>
          </div>
        </div>
        <div className="w-full">
          <TextField
            className="mt-8 mb-8"
            required
            label="Mahsulot nomi"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={""}
            onChange={(event) => {}}
          />
          <TextField
            className="mt-8 mb-8"
            required
            label="Qisqacha ma'lumot"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={""}
            onChange={(event) => {}}
          />
          <MultipleSelectChip/>
        </div>
        
      </div>
      {(
        <Box
          className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        >
          <sapn className="ml-auto"></sapn>
          <Button
            className="ml-8"
            variant="contained"
            color="secondary"
            disabled={false}
            onClick={() => {}}
          >
            Create
          </Button>
        </Box>
      )}
    </>
  );
}

export default TaskForm;