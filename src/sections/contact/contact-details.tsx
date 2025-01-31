import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    value: 'facebook',
    label: 'Facebook',
    link: 'https://www.facebook.com/ProtivaMEF/',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    link: '#',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    link: '#',
  },
  {
    value: 'twitter',
    label: 'Twitter',
    link: '#',
  },
];

// ----------------------------------------------------------------------

export function ContactDetails() {
  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Get in touch
      </Typography>

      <Box
        sx={{
          mb: 3,
          gap: 1.5,
          display: 'flex',
        }}
      >
        <Iconify icon="carbon:email" width={22} />

        <div>
          <Box
            component="span"
            sx={{
              typography: 'subtitle2',
              display: 'block',
              mb: 0.5,
            }}
          >
            Email
          </Box>
          <Link sx={{ typography: 'body2', color: 'inherit' }} href="mailto:protivanasir@gmail.com">
            protivanasir@gmail.com
          </Link>
        </div>
      </Box>

      <Box
        sx={{
          mb: 3,
          gap: 1.5,
          display: 'flex',
        }}
      >
        <Iconify icon="solar:smartphone-linear" width={22} />

        <div>
          <Box
            component="span"
            sx={{
              typography: 'subtitle2',
              display: 'block',
              mb: 0.5,
            }}
          >
            Phone
          </Box>
          <Typography variant="body2">+88 01711-142366, 01925-509599</Typography>
        </div>
      </Box>

      <Box
        sx={{
          mb: 3,
          gap: 1.5,
          display: 'flex',
        }}
      >
        <Iconify icon="carbon:location" width={22} />

        <div>
          <Box
            component="span"
            sx={{
              typography: 'subtitle2',
              display: 'block',
              mb: 0.5,
            }}
          >
            Address
          </Box>
          <Typography variant="body2">
            314/2, West Brahmondi, Narsingdi Govt College, Narsingdi Sadar, Narsingdi, Dhaka,
            Bangladesh
          </Typography>
        </div>
      </Box>

      <Divider style={{ borderStyle: 'dashed' }} />

      <Box
        sx={(theme) => ({
          mt: 3,
          mb: 5,
          display: 'flex',
        })}
      >
        {SOCIALS.map((social) => (
          <IconButton
            component={RouterLink}
            href={social.link}
            rel="noopener"
            target="_blank"
            key={social.label}
          >
            {social.value === 'twitter' && <TwitterIcon />}
            {social.value === 'facebook' && <FacebookIcon />}
            {social.value === 'instagram' && <InstagramIcon />}
            {social.value === 'linkedin' && <LinkedinIcon />}
          </IconButton>
        ))}
      </Box>
    </>
  );
}
