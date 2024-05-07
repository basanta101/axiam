import PropTypes from 'prop-types';
import { ICON } from "./Icon.constants";


const Icon = ({ icon, classes = '',  text=''}) => {
  return <div className={`h-16 w-16 ${classes}`}>
    <img src={ICON[icon]} className="icon-wrap"/>
    {text && <div className="text-center icon-text">{text}</div>}
  </div>;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.string,
  text: PropTypes.string,
};

export default Icon;
