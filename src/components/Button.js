import PropTypes from 'prop-types'

export const Button = ({ color, text, onShow }) => {
    return (
        <div>
            <button style={{ backgroundColor: color }} className='btn' onClick={onShow}>
                {text}
            </button>
        </div>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
}

export default Button
