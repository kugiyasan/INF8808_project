import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

interface DropdownProps {
    options: object[];
    onUpdate: (selected: any) => void;
    placeholder?: string;
    singleSelect: boolean;
    limit?: number;


}



const Dropdown: React.FC<DropdownProps> = ({options, onUpdate}) => {
    const customStyles = {
        multiselectContainer: {
          width: '300px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        searchBox: {
          border: 'none',
          fontSize: '10px',
          minHeight: '50px'
        },
        inputField: {
          margin: '5px'
        },
        chips: {
          backgroundColor: 'grey'
        },
        optionContainer: {
          border: '2px solid'
        },
        option: {
          color: 'black'
        },
        groupHeading: {
          // Custom styles for group heading
        }
      };

    const updateSelectedValues = (selectedList: any) => {
        onUpdate(selectedList.map((item: any) => item.name));
    }
  return (
    <Multiselect 
            options={options}
            displayValue="name"
            style={customStyles}
            onSelect={updateSelectedValues}
            onRemove={updateSelectedValues}
            />
  );
};

export default Dropdown;
