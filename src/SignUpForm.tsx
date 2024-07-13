import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { TextField, Button, Box, Typography, Dialog, DialogTitle, InputAdornment, IconButton } from '@mui/material';
import styles from './form.styles';
import useYupValidationResolver from './useYupValidationResolver';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IFormInput {
    email: string;
    password: string;
}

const emailErrors = [
    'Email is required',
    'Must be valid email',
];

const lengthErrors = [
    'Password must be at least 8 characters',
    'Password must be at most 64 characters',
    'Password must not contain spaces'
];

const upperLowerErrors = [
    'Password must contain an uppercase letter',
    'Password must contain a lowercase letter'
];

const digitErrors = [
    'Password must contain a number'
];

const schema = yup.object({
    email: yup.string().email(emailErrors[1]).required(emailErrors[0]),
    password: yup.string()
    .required('Password is required')
    .min(8, lengthErrors[0])
    .max(64, lengthErrors[1])
    .matches(/^\S*$/, lengthErrors[2])
    .matches(/[A-Z]/, upperLowerErrors[0])
    .matches(/[a-z]/, upperLowerErrors[1])
    .matches(/\d/, digitErrors[0]),
}).required();

const getRowHelperTextStyles = (errors: string[], message: string, isSubmitted: boolean) => {
    if (!isSubmitted) return styles.helperTextDefault;
    const containsError = errors.some(error => message.includes(error));
    return containsError ? styles.helperTextInvalid : styles.helperTextValid;
}

const getEmailHelperTextStyles = (errors: FieldErrors<IFormInput>, isSubmitted: boolean) => {
    const message = errors?.email?.message || '';
    return {
        valid: getRowHelperTextStyles(emailErrors, message, isSubmitted),
    };
};

const getPasswordHelperTextStyles = (errors: FieldErrors<IFormInput>, isSubmitted: boolean) => {
    const message = errors?.password?.message || '';
    return {
        length: getRowHelperTextStyles(lengthErrors, message, isSubmitted),
        upperLower: getRowHelperTextStyles(upperLowerErrors, message, isSubmitted),
        digit: getRowHelperTextStyles(digitErrors, message, isSubmitted),
    };
};

const SignUpForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const resolver = useYupValidationResolver(schema);
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<IFormInput>({
        resolver,
    });

    const onSubmit: SubmitHandler<IFormInput> = () => {
        setOpen(true);
    };

    const emailHelperTextStyles = getEmailHelperTextStyles(errors, isSubmitted);
    const passwordHelperTextStyles = getPasswordHelperTextStyles(errors, isSubmitted);

    const emailHelperText = (
        <Box component="span" sx={styles.helperText}>
            <Typography component="span" sx={emailHelperTextStyles.valid}>
                Email should be valid
            </Typography>
        </Box>
    );

    const passwordHelperText = (
        <Box component="span" sx={styles.helperText}>
            <Typography component="span" sx={passwordHelperTextStyles.length}>
                Has 8-64 characters (no spaces)
            </Typography>
            <Typography component="span" sx={passwordHelperTextStyles.upperLower}>
                Has uppercase and lowercase letters
            </Typography>
            <Typography component="span" sx={passwordHelperTextStyles.digit}>
                Has 1 digit minimum
            </Typography>
        </Box>
    );

    return (
        <Box
            sx={styles.formWrapper}
        >
            <Box sx={styles.formContainer}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={emailHelperText}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={passwordHelperText}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={styles.submitButton}>
                        Sign Up
                    </Button>
                </form>
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Sign up success</DialogTitle>
            </Dialog>
        </Box>
    );
};

export default SignUpForm;
