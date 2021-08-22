const Input = ({ type, name, value, disabled, onChange }) => {
    return (
        <input
            className={`${disabled ? 'input-hidden-disabled' : ''}`}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e)}
        />
    );
};

export default Input;
