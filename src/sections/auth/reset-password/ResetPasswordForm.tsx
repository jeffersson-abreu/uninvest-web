import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { getAxiosInstance } from 'src/utils/axios';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

type FormValuesProps = {
  password: string;
  confirm: string;
  afterSubmit?: string;
};

type Props = {
  onSent: VoidFunction;
  token: string;
};

export default function ResetPasswordForm({ onSent, token }: Props) {
  const isMountedRef = useIsMountedRef();

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Senha é obrigarória'),
    confirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não batem')
      .required('Confirmação de senha é obrigarória'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { 
      password: '',
      confirm: ''
    }
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const axios = getAxiosInstance();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await axios.post('/api/auth/reset/password', {
        password: data.password,
        token
      });

      if (isMountedRef.current) {
        onSent();
      }
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', {
          message: error.message
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">
            {errors.afterSubmit.message}
          </Alert>
        )}

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirm"
          label="Repita a nova senha"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Alterar senha
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
