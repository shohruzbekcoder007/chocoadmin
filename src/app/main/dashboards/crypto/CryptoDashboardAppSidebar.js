import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import WatchlistItem from './widgets/WatchlistItem';
import { selectWidgets } from './store/widgetsSlice';
import BuySellForm from './widgets/BuySellForm';

function CryptoDashboardAppSidebar() {
  const widgets = useSelector(selectWidgets);

  const { watchlist } = widgets || {};

  return (
    <>
      <Paper elevation={0} square>
        {watchlist?.map((item) => (
          <WatchlistItem key={item.iso} item={item} />
        ))}
      </Paper>
      <BuySellForm />
    </>
  );
}

export default CryptoDashboardAppSidebar;
