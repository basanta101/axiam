import { useRef, useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useOnClickOutside } from "@/hooks/useOutsideClick";
import SearchInput from '../SearchInput/SearchInput';
import './AutoComplete.scss';
import Button from '../Button/Button';

// const INITIAL_STATE = (options) => options.map((option) => ({ ...option, isSelected: false}))

function autoCompleteReducer(state, action) {
    if (action.type === 'update') {
        console.log('update called', action)
      return action.payload;
    }
    throw Error('Unknown action.');
}

const Autocomplete = ({ options = [], labelKey = 'label', valueKey = 'value', onSelect = f => f, selectKey= 'isSelected', reducer = autoCompleteReducer }) => {
    const [filteredOptions, setFilteredOptions] = useReducer(reducer, options);
    // const [filteredOptions, setFilteredOptions] = useState(options);
    // const isFirstRender = useRef(true)
    // useEffect(() => {
    //     isFirstRender.current = false
    //     console.log('useEffect autocomplete', options, isFirstRender)
        
    //     if(!isFirstRender.current) setFilteredOptions({ type: 'update', payload: options})
    // }, [options])
    const [open, setOpen] = useState(false)

    const openList = () => setOpen(true)
    const closeList = () => {
        setOpen(false)
    }
    const containerRef = useRef(null)
    useOnClickOutside(containerRef, closeList)
    const onSearch = (value) => {
        console.log('onSearch', value);
        if (!value) {
            setFilteredOptions({ type: 'update', payload: options})
            // setFilteredOptions(options)
        } else {
            const filtered = options.filter(option =>
                option[labelKey].toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions({ type: 'update', payload: filtered})
            // setFilteredOptions(filtered);
        }

    };

    const handleSelect = (selectedOption) => {
        // debugger
        const updatedSelectedOption = { ...selectedOption, [selectKey]: !selectedOption[selectKey] }
        // debugger
        // setFilteredOptions(filteredOptions.map((option) => {
        //     if(option[labelKey] === selectedOption[labelKey]) {
        //         return updatedSelectedOption
        //     }
        //     return option
        // }))
        const payload = filteredOptions.map((option) => {
            if(option[labelKey] === selectedOption[labelKey]) {
                return updatedSelectedOption
            }
            return option
        })
        setFilteredOptions({ type: 'update', payload })
        updatedSelectedOption[selectKey] && onSelect(updatedSelectedOption?.[valueKey], updatedSelectedOption)
        closeList()
    };


    return (
        <div ref={containerRef} className='flex-1 auto-wrap  flex-cc relative'>
            <SearchInput onSearch={onSearch} onFocus={openList} onBlur={closeList} placeholder='Search for any software...'  classes='w-100-p'/>
            {open && (
                <ul className='absolute list-wrap border-grey2 w-100-p p-12 b-r4'>
                    {filteredOptions.map((option, index) => (
                        <li key={index} onClick={() => handleSelect(option)}>
                            <Button>
                                <Button.Icon icon={option[valueKey]}/>
                                <Button.Text text={option[labelKey]}/>
                            </Button>
                            {/* {option.label} */}
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
    reducer: PropTypes.func,
}

export default Autocomplete;

//TODO: check if state reducer pattern fits here, as the same state is getting stored in the ProductSelection component