// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function ShieldIcon({ ...other }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box {...other}>
      <svg width="100%" height="100%" viewBox="0 0 428 475" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M214.889 474.731C207.871 474.706 200.883 473.759 194.09 471.911L192.751 471.523L191.508 470.87C146.602 447.273 108.718 416.105 78.9063 378.231C54.2287 346.695 34.9889 310.89 22.0522 272.424C6.58177 226.372 -0.861003 177.779 0.0791406 128.966C0.0981109 127.941 0.114166 127.15 0.114166 126.605C0.114166 102.876 12.6814 82.0563 32.1307 73.5629C47.0162 67.0625 182.169 8.88225 191.934 4.67856C210.325 -4.97901 229.944 3.08175 233.084 4.49136C240.126 7.50902 365.067 61.0669 392.067 74.5412C419.893 88.4283 427.317 113.376 427.317 125.927C427.317 182.752 417.926 235.86 399.407 283.775C384.45 322.558 363.252 358.363 336.735 389.629C285.575 449.969 234.401 471.36 233.907 471.548C227.791 473.754 221.357 474.831 214.889 474.731ZM202.855 443.488C207.292 444.531 217.506 446.095 224.164 443.549C232.622 440.317 275.453 417.039 315.478 369.832C370.779 304.609 398.839 222.618 398.88 126.137C398.781 124.182 397.456 110.241 379.841 101.45C353.365 88.2365 223.499 32.583 222.191 32.0221L221.832 31.8627C219.11 30.6674 210.449 28.1498 204.479 31.4288L203.283 32.0129C201.836 32.636 58.369 94.3922 43.0682 101.074C32.3648 105.748 28.5513 117.327 28.5513 126.605C28.5513 127.283 28.5345 128.269 28.5109 129.544C27.288 195.56 41.8641 358.005 202.855 443.488Z" fill={PRIMARY_DARK}/>
        <path d="M197.881 18.2283C197.881 18.2283 53.1105 80.5448 37.5994 87.3183C22.0882 94.0918 14.3327 110.348 14.3327 126.605C14.3327 142.861 2.69933 354.987 197.881 457.549C197.881 457.549 215.596 462.686 229.036 457.549C242.476 452.412 413.098 365.711 413.098 125.927C413.098 125.927 413.098 101.543 385.954 87.9957C358.809 74.4486 227.57 18.2283 227.57 18.2283C227.57 18.2283 211.453 10.7774 197.881 18.2283Z" fill={PRIMARY_MAIN}/>
        <path opacity="0.1" d="M213.392 66.9977V399.434C213.392 399.434 67.3291 325.747 68.6217 132.024L213.392 66.9977Z" fill="black"/>
        <path d="M215.297 305.924L168.769 243.224L195.827 221.168L217.858 250.855L292.283 168.514L317.171 193.227L215.297 305.924Z" fill="white"/>
      </svg>
    </Box>
  );
}