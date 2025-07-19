import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { client } from 'src/lib/trpc';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { ChangePasswordSchema, type ChangePasswordSchemaType } from './schema';

// ----------------------------------------------------------------------

export function UserChangePasswordForm() {
  const showPassword = useBoolean();

  const defaultValues: ChangePasswordSchemaType = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm<ChangePasswordSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleChangePassword, isPending } = useMutation({
    mutationFn: async (data: ChangePasswordSchemaType) => {
      await client.user.changePassword.$post(data);
    },
    onSuccess: () => {
      toast.success('Password changed successfully!');
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleChangePassword(data);
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3, mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Stack spacing={1.5}>
          <Field.Text
            name="oldPassword"
            label="Old password"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Field.Text
            name="newPassword"
            label="Password"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            helperText={
              <Box component="span" sx={{ gap: 0.5, display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:info-fill" width={16} /> Password must be minimum 6+
              </Box>
            }
          />

          <Field.Text
            name="confirmPassword"
            type={showPassword.value ? 'text' : 'password'}
            label="Confirm password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isPending}>
            Change
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
