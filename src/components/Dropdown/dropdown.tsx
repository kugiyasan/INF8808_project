import React from "react";
import Multiselect from "multiselect-react-dropdown";
import "./dropdown.css"; // Import CSS for styling

interface Item {
  name: string;
}

interface DropdownProps {
  options: object[];
  onUpdate: (selected: string[]) => void;
  placeholder?: string;
  limit?: number;
  preSelected?: Item[];
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onUpdate,
  placeholder,
  limit,
  preSelected,
}) => {
  const customStyles = {
    multiselectContainer: {
      width: "300px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    searchBox: {
      border: "none",
      fontSize: "10px",
      minHeight: "50px",
      alignItems: "center",
    },
    inputField: {
      margin: "5px",
    },
    chips: {
      backgroundColor: "grey",
    },
    optionContainer: {
      border: "2px solid",
      backgroundColor: "red",
    },
    option: {
      color: "black",
      backgroundColor: "white",
    },
  };

  const updateSelectedValues = (selectedList: Item[]) => {
    onUpdate(selectedList.map((item) => item.name));
  };

  return (
    <Multiselect
      options={options}
      selectionLimit={limit ?? 100}
      displayValue="name"
      style={customStyles}
      onSelect={updateSelectedValues}
      onRemove={updateSelectedValues}
      placeholder={placeholder ? placeholder : "Select"}
      selectedValues={preSelected ? preSelected : []}
    />
  );
};

export default Dropdown;
