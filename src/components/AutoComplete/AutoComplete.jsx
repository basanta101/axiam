import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useOnClickOutside } from "@/hooks/useOutsideClick";
import SearchInput from '../SearchInput/SearchInput';
import './AutoComplete.scss';
import { SELECT_KEY } from '@/constants/autocomplete.constants';
import Icon from '../Icon/Icon';
import { ICON_TYPE } from '../Icon/Icon.constants';


const Autocomplete = ({ options = [], labelKey = 'label', valueKey = 'value', onSelect = f => f, onSearch = f => f }) => {
    const [open, setOpen] = useState(false)
    const openList = () => setOpen(true)
    const closeList = () => {
        setOpen(false)
    }
    const containerRef = useRef(null)
    useOnClickOutside(containerRef, closeList)
    return (
        <div ref={containerRef} className='flex-1 auto-wrap  flex-cc relative'>
            <SearchInput onSearch={onSearch} onFocus={openList} onBlur={closeList} placeholder='Search for any software...'  classes='w-100-p'/>
            {open && (
                <ul className='absolute list-wrap border-grey2 w-100-p p-12 b-r4 bg-white '>
                    {options.map((option, index) => (
                        <li className={`flex flex-jb flex-ac list-item b-r4 m-b-6 p-lr-4 pointer w-100-p ${option[SELECT_KEY] ? 'bg-purple-dark text-white' : ''}`} key={index} onClick={() => onSelect(option)} >
                            <Icon classes="flex" icon={option[valueKey]}/>
                            <div className="flex-1 p-4 p-lr-8 f-14">{option[labelKey]}</div>
                            {option[SELECT_KEY] ? <Icon icon={ICON_TYPE.TICK} classes='icon-tick p-r-4'/> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

Autocomplete.propTypes = {
    options: PropTypes.array,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    selectKey: PropTypes.string,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
}

export default Autocomplete;
