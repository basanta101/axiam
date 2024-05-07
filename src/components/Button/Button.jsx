import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const BtnIcon = ({ icon = '', classes = '' }) => {
  return <Icon icon={icon} classes={classes}/>
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


function Button({ onClick, children = null, classes= '' }) {
  return (
    <button className={`flex b-r4 p-4 pointer  ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  classes: PropTypes.string
};

export default Button;
Button.Icon = BtnIcon
Button.Text = BtnText

