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
// assets
import { DocIllustration } from '../../assets';

import LoadingScreen from '../../components/LoadingScreen';
import { useEffect, useState } from 'react';
import { getAxiosInstance } from 'src/utils/axios';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyEmail() {
  const [loading, setLoading ] = useState(false);
  const [error, setError ] = useState('');
  
  const location = useLocation();
  
  const navigate = useNavigate();

  const api = getAxiosInstance();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token')
  
      if (!token) {
        navigate(PATH_AUTH.login, { replace: true })
      }
  
      try {
        await api.post('/api/auth/email/confirm', { token });
      } catch (error: any) {
        setError(error.message ?? 'Faça uma nova solicitação na sessão de recuperação de senha')
      } finally {
        setLoading(false);
      }
    })()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Page title="Confirmação de email" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              <Box sx={{ textAlign: 'center' }}>
                <DocIllustration sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  {error ? 'Falha ao confirmar email' : 'Email confirmado com sucesso' }
                </Typography>

                <Typography>
                  { error ? error : 'Você confirmou o email associado a sua conta com sucesso.'}
                </Typography>

                <Button
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.login}
                  sx={{ mt: 5 }}
                >
                  Ok
                </Button>
              </Box>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
