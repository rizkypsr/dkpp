export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `px-5 py-3 mb-2 text-sm font-semibold text-[#7E8299] bg-white rounded-md hover:bg-gray-100 focus:outline-none ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
