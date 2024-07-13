/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import * as yup from 'yup';

interface ValidationError {
    path?: string;
    type?: string;
    message: string;
}

type ResolverResult<T> = {
    values: T | Record<string, never>;
    errors: Record<string, { type: string; message: string }>;
};

const useYupValidationResolver = <T>(validationSchema: yup.Schema<T>) =>
    useCallback(
        async (data: T):Promise<ResolverResult<T>> => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false
                });

                return {
                    values,
                    errors: {}
                };
            } catch (validationErrors: unknown) {
                const errors = (validationErrors as yup.ValidationError).inner.reduce(
                    (allErrors: Record<string, { type: string; message: string }>, currentError: ValidationError) => {
                        const existingError = allErrors[currentError.path as string];
                        const newMessage = existingError
                            ? `${existingError.message} ${currentError.message}`
                            : currentError.message;
                        return {
                            ...allErrors,
                            [currentError.path as string]: {
                                type: 'validation',
                                message: newMessage
                            }
                        };
                    },
                    {}
                );

                return {
                    values: {},
                    errors
                };
            }
        },
        [validationSchema]
    );

export default useYupValidationResolver;
