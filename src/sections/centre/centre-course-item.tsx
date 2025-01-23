import type { ICourseItem } from 'src/types/course';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  course: ICourseItem;
  onUnsigned: () => void;
};

export function CentreCourseItem({ course, onUnsigned }: Props) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            onUnsigned();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Unsigned
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Card>
        <IconButton onClick={menuActions.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Box sx={{ p: 3, pb: 2 }}>
          <Chip
            variant="soft"
            label="103"
            size="small"
            color="success"
            sx={{ mb: 2 }}
            icon={<Iconify width={14} icon="eva:hash-fill" />}
          />

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Typography
                variant="subtitle1"
                color="inherit"
                sx={[
                  (theme) => ({
                    ...theme.mixins.maxLine({ line: 1 }),
                  }),
                ]}
              >
                Certificate in Auto CAD (2D and 3D)
              </Typography>
            }
            secondary={`Assined date: ${fDate(new Date())}`}
            slotProps={{
              primary: {
                typography: 'subtitle1',
              },
              secondary: {
                mt: 1,
                component: 'span',
                typography: 'caption',
                color: 'text.disabled',
              },
            }}
          />

          <Box
            sx={{
              gap: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              typography: 'caption',
            }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />0 students
          </Box>
        </Box>
      </Card>

      {renderMenuActions()}
    </>
  );
}
