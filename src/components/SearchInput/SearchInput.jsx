import { useRef, useState } from "react";
import PropTypes from 'prop-types';
import Icon from "../Icon/Icon"
import { ICON_TYPE } from "../Icon/Icon.constants"
import './SearchInput.scss'


const SearchInput = ({ onSearch = f => f, onFocus = f => f, placeholder = '', classes = '' }) => {
    const [searchText, updateSearchText] = useState('')
    const inputRef = useRef(null);
    const [isActive, setActive] = useState(false)

    const handleClick = () => {
        console.log('handleClick called')
        inputRef.current.focus()
        setActive(true)
        onFocus()
    }

    const onChange = (e) => {
        const text = e.target.value
        updateSearchText(text)
        onSearch(text)
    }

    const onBlur = () => {
        setActive(false)
    }

    return <div className={`wrap bg-anti-flash-white ${isActive ?'focus' :'' } ${classes}`} onClick={handleClick}>
        <Icon icon={ICON_TYPE.SEARCH} />
        <input className='flex-1' ref={inputRef} type='text' placeholder={placeholder} onChange={onChange} value={searchText} onBlur={onBlur}/>
    </div>
}

SearchInput.propTypes = {
    onSearch: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    classes: PropTypes.string,
}

export default SearchInput
