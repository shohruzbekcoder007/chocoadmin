import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import OrderList from './OrderList';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SearchOrderModal from './SearchOrderModal';

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

function Oreder(props) {

  const { t } = useTranslation();

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
              {t("View order")}
            </Typography>

            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <SearchOrderModal/>
                {/* <CreateSize setCreatedOption={setCreatedOption}/> */}
                {/* <CreateBrand setCreatedOption={setCreatedOption}/> */}
              </motion.div>
            </div>
          </div>
      }
      content={
        <div className="p-24 w-full">
          <OrderList/>
        </div>
      }
      scroll="content"
    />
  );
}

export default Oreder;
