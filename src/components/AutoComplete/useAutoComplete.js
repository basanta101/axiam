import { useState } from "react";

 const useAutoComplete = ({ options, labelKey,  selectKey }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const onSearch = (value) => {
        console.log('onSearch', value);
        if (!value) {
            setFilteredOptions(options)
        } else {
            const filtered = options.filter(option =>
                option[labelKey].toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        }

    };
    const onSelect  = (selectedOption) => {
        const updatedSelectedOption = { ...selectedOption, [selectKey]: !selectedOption[selectKey] }
        setFilteredOptions(filteredOptions.map((option) => {
            if(option[labelKey] === selectedOption[labelKey]) {
                return updatedSelectedOption
            }
            return option
        }))
    };

    const updateOptions = (options) => {
        setFilteredOptions(options)
    }

    return { filteredOptions, onSearch, onSelect, updateOptions }

}

export default useAutoComplete
