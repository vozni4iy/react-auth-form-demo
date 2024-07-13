const styles = {
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    formContainer: {
        width: '400px',
        textAlign: 'center',
    },
    submitButton: {
        marginTop: '16px',
    },
    helperText: {
        display: 'block',
        fontSize: '0.875rem',
        marginTop: '8px',
    },
    helperTextDefault: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)', // Default color
    },
    helperTextValid: {
        display: 'block',
        color: 'green', // Valid color
    },
    helperTextInvalid: {
        display: 'block',
        color: 'red', // Invalid color
    },
};

export default styles;
