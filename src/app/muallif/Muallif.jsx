import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import { Input, Paper, Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { motion } from 'framer-motion';
import MuallifList from './MuallifList';

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

function Muallif(props) {

  return (
    <Root
      header={
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-24 px-24 md:px-32">
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="text-24 md:text-32 font-extrabold tracking-tight"
            >
              Muallif
            </Typography>
            {/* <SketchColor/> */}
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
              </motion.div>
            </div>
          </div>
      }
      content={
        <div className="p-24 w-full">
          <MuallifList/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Muallif;