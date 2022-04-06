const customInput = ({ field, form, ...props }) => {
    return (
        <>
            <label htmlFor="email">{field.name}</label>
            <input
                {...field}
                {...props}
                className={
                    form.errors[field.name] && form.touched[field.name]
                        ? "login-form__input--error"
                        : "login-form__input"
                }
            />
        </>
    );
};

const customError = (props) => {
    return <p className="login-form__error"> {props.children} </p>;
};

export { customInput, customError };
