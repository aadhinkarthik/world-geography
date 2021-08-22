const Input = ({ className, type, name, value, disabled, onChange }) => {
    return (
        <input
            className={className}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e)}
        />
    );
};

export default Input;
