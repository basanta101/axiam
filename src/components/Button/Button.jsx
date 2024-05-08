import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { BUTTON_VARIANT } from './Button.constants';
import './Button.scss'

const BtnIcon = ({ icon = '', classes = '' }) => {
  return <Icon icon={icon} classes={classes} />
}

BtnIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

const BtnText = ({ text = '', classes = '' }) => {
  return <div className={`m-tb0 m-lr6 ${classes}`}>{text}</div>
}

BtnText.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.string
};


function Button({ onClick, children = null, classes = '', variant = BUTTON_VARIANT.DEFAULT , disabled = false}) {
  console.log('Button', variant)
  return (
    <button className={`flex b-r4 p-4 pointer b-r4 text-center  p-12 ${classes} ${variant} ${disabled ? 'disabled not-allowed' : 'active'}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  classes: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
Button.Icon = BtnIcon
Button.Text = BtnText
