import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import { Button, Input, Paper, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FuseScrollbars from '@fuse/core/FuseScrollbars/FuseScrollbars';
import DataTable from './DataTable';
import CreateCategory from '../CreateCategory';
import AlertMessage from '../AlertMessage';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function CategoryList() {

  const [createdOption, setCreatedOption] = useState(null)

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Category Create</h4>
        </div>
      }
      content={
        <div className="p-24 w-full">
          <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="text-24 md:text-32 font-extrabold tracking-tight"
            >
              Category
            </Typography>

            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
              <Paper
                component={motion.div}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
              >
                <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

                <Input
                  placeholder="Search products"
                  className="flex flex-1"
                  disableUnderline
                  fullWidth
                  value={''}
                  inputProps={{
                    'aria-label': 'Search',
                  }}
                  onChange={() => { }}
                />
              </Paper>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <CreateCategory setCreatedOption={setCreatedOption}/>
              </motion.div>
            </div>
          </div>

          <div className="w-full flex flex-col min-h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.1 } }}
              className="flex flex-1 items-center justify-center h-full"
            >
              <DataTable />
            </motion.div>
          </div>
          {
            createdOption?<AlertMessage alertMessage={createdOption.alertMessage} _openAlert={true} type={createdOption.type}/>:null
          }
        </div>
      }
      scroll="content"
    />
  );
}

export default CategoryList;
