const customInput = ({ field, form, ...props }) => {
    return (
        <>
            <label className='login-form__label' htmlFor={field.name}>{field.name}</label>
            <input
                {...field}
                {...props}
                className={ `login-form__input ${form.errors[field.name] && form.touched[field.name]
                        ? 'error'
                        : ''}`
                }
            />
        </>
    );
};

const customError = (props) => {
    return <p className='login-form__error'> {props.children} </p>;
};

export { customInput, customError };
