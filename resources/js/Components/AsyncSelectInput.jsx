import React from "react";
import AsyncSelect from "react-select/async";

// Reusable AsyncSelect Component
export default function AsyncSelectInput({
    loadOptions,
    onChange,
    value,
    placeholder = "Select...",
    customStyles = {},
    ...props
}) {
    // Default custom styles
    const defaultStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#f0f0f0", // Background gray
            border: "none", // No border
            boxShadow: "none", // Remove default shadow
            minHeight: "40px",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#f0f0f0", // Menu background gray
            borderRadius: "4px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#e2e2e2" : "#f0f0f0", // Lighter gray when focused
            color: "#333",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#666",
        }),
        ...customStyles, // Allow for custom styles to be passed in
    };

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={onChange}
            value={value}
            styles={defaultStyles}
            placeholder={placeholder}
            {...props}
        />
    );
}
