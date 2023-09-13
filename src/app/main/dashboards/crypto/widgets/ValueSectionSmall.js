import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function ValueSectionSmall(props) {
  const { value, title, unit, className } = props;

  const unitValues = {
    B: 1000000000,
    M: 1000000,
  };

  return (
    <div className={clsx(className, 'p-16')}>
      <Typography className="text-sm font-medium leading-none" color="text.secondary">
        {title}
      </Typography>
      <Typography className="mt-8 font-mono text-xl leading-none">
        {(value / (unitValues[unit] || 1)).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        {unit}
      </Typography>
    </div>
  );
}

ValueSectionSmall.propTypes = {
  unit: PropTypes.oneOf(['B', 'M', '']),
  title: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.number,
};

ValueSectionSmall.defaultProps = {
  unit: '',
  title: '',
  value: 0,
  className: '',
};

export default ValueSectionSmall;
