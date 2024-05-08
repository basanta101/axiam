import PropTypes from 'prop-types'

const Badge = ({ text = '', classes = '' }) => {
    return <div className={`badge-gradient badge-wrap p-tb-6 p-lr-8 w-fc b-r4 text-white f-12 f-w-600 ${classes}`}>{text}</div>
}

Badge.propTypes = {
    classes: PropTypes.string,
    text: PropTypes.string,
}

export default Badge;
