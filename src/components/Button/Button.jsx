const Button = ({btnClickHandler, disabled, btnText}) => (
    <button onClick={btnClickHandler} disabled={disabled}>{btnText}</button>
);

export default Button;