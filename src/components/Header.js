import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onShow, showAdd }) => {
    return (
        <header className='header'>
            <h1 style={headingStyle}>{title}</h1>
            <Button onShow={onShow}
                text={showAdd ? 'Close' : 'Add'}
                color={showAdd ? 'Red' : 'Green'} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = {
    color: 'black'
}

export default Header
