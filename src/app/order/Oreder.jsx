import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import DemoContent from '@fuse/core/DemoContent';
import OrderList from './OrderList';
import { useTranslation } from 'react-i18next';

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
        <div className="p-24">
          <h4>{t("Order List")}</h4>
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
