import type { ICourseWithCategoryItem } from 'src/types/course';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: ICourseWithCategoryItem;
  selected: boolean;
  editHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function CourseTableRow({ row, selected, onSelectRow, onDeleteRow, editHref }: Props) {
  const confirmDialog = useBoolean();
  const menuActions = usePopover();

  const renderPrimaryRow = () => (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{
            id: `${row.id}-checkbox`,
            'aria-label': `${row.id} checkbox`,
          }}
        />
      </TableCell>

      <TableCell>
        <Link component={RouterLink} href={editHref} color="inherit" sx={{ cursor: 'pointer' }}>
          {row.title}
        </Link>
      </TableCell>

      <TableCell>
        <Chip variant="outlined" size="small" color="primary" label={row.code} />
      </TableCell>

      <TableCell>{row.duration}</TableCell>

      <TableCell>{row.qualification}</TableCell>

      <TableCell>{fCurrency(row.fee)}</TableCell>

      <TableCell>
        <Label variant="soft" color={(row.publish === 'published' && 'info') || 'default'}>
          {row.publish}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={menuActions.onClose}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfrimDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      {renderPrimaryRow()}
      {renderMenuActions()}
      {renderConfrimDialog()}
    </>
  );
}
