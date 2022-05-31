const Input  = ({inputChangeHandler, keyUpHandler, value}) => (
    <input 
        type="text" 
        onChange={inputChangeHandler} 
        onKeyUp={keyUpHandler}
        value={value}/>
);

export default Input;