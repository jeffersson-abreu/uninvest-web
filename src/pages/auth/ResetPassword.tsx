import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { ShieldIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {

  const [token, setToken] = useState('');
  
  const [sent, setSent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

      const params = new URLSearchParams(location.search);
      const token = params.get('token')
  
      if (!token) {
        navigate(PATH_AUTH.login, { replace: true })
      }

      setToken(token ?? '')
  }, [])

  return (
    <Page title="Redefinição de senha de senha" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Escolha uma nova senha
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Por favor, insira uma nova senha e repita ela abaixo 
                  para que possamos adicioná-la a sua conta
                </Typography>

                <ResetPasswordForm
                  onSent={() => setSent(true)}
                  token={token}
                />
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <ShieldIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Senha recuperada
                </Typography>

                <Typography>
                  Agora você pode fazer login novamente <br /> na plataforma
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 5 }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
