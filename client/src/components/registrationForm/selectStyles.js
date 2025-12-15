// selectStyles.js

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#ffffff",
    borderColor: state.isFocused ? "#0d325c" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(13, 50, 92, 0.3)" : "none",
    borderRadius: "5px",
    padding: "10px 0px",
    minHeight: "38px",
    color: "#0d325c",
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
    fontWeight: 500,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6b7280",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#0d325c"
      : state.isFocused
      ? "#f3f4f6"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "black",
    fontWeight: state.isSelected ? 600 : 400,
    padding: "10px 0px",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    marginTop: 4,
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "#0d325c",
    transition: "all 0.2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    "&:hover": {
      color: "#0a2445",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "#d1d5db",
  }),
};

export default customSelectStyles;
