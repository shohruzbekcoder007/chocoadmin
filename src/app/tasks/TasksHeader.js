import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTranslation } from 'react-i18next';
import SearchProduct from './SearchProduct';

function TasksHeader({setSearchText}) {

  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row item-center sm:items-start space-y-16 sm:space-y-0 p-20 sm:p-20 w-full border-b-1 flex items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-12">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          {t("Products")}
        </Typography>
      </div>

      <div className="flex items-center -mx-8">
        <SearchProduct setSearchText={setSearchText}/>
        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          component={NavLinkAdapter}
          // to="new/task"
          to="/addproduct"
        >
          <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          <span className="mx-8">{t("Add Product")}</span>
        </Button>
      </div>
    </div>
  );
}

export default TasksHeader;
