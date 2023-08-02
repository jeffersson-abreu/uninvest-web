// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import { HomeHero } from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
}));


// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="A união dos seus investimentos em um único lugar">
      <RootStyle>
        <HomeHero />
      </RootStyle>
    </Page>
  );
}
