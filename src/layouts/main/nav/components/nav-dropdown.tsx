import type { FadeProps } from '@mui/material/Fade';

import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const NavDropdownPaper = styled('div')(({ theme }) => ({
  ...theme.mixins.paperStyles(theme, { dropdown: true }),
  padding: theme.spacing(1.5, 2, 1, 4),
  borderRadius: theme.shape.borderRadius,
  ...(theme.direction === 'rtl' && {
    padding: theme.spacing(5, 4, 1, 1),
  }),
}));

// ----------------------------------------------------------------------

type NavDropdownProps = React.ComponentProps<'div'> & {
  open: FadeProps['in'];
};

export const NavDropdown = styled(({ open, children, ...other }: NavDropdownProps) => (
  <Fade in={open}>
    <div {...other}>
      <NavDropdownPaper>{children}</NavDropdownPaper>
    </div>
  </Fade>
))(({ theme }) => ({
  marginTop: 12,
  position: 'fixed',
  padding: theme.spacing(1.5, 0),
  zIndex: theme.zIndex.drawer * 2,
  top: 'calc(var(--layout-header-desktop-height) / 2)',
}));
