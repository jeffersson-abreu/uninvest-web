// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function LogoIcon({ ...other }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box {...other}>
        <svg width="100%" height="100%" viewBox="0 0 428 475" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0.000000,667.000000) scale(0.100000,-0.100000)" fill="none" stroke="none">
            <path fill={PRIMARY_DARK} d="M3773 3838 c3 -898 4 -925 24 -1008 91 -367 315 -647 645 -805 141 -67 330 -115 459 -115 l39 0 0 258 c2 1392 0 1554 -21 1655 -22 111 -50 189 -104 297 -169 335 -507 578 -879 629 -43 6 -98 11 -122 11 l-45 0 4 -922z"/>
            <path fill={PRIMARY_MAIN} d="M6055 3799 c-487 -70 -895 -468 -980 -957 -12 -66 -15 -181 -15 -508 l0 -424 39 0 c111 0 306 45 426 98 369 163 625 496 690 895 11 71 15 187 15 500 l0 407 -57 -1 c-32 -1 -85 -5 -118 -10z"/>
        </g>
        </svg>
    </Box>
  );
}