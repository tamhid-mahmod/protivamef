import type { IDistrictsWithDivisionItem } from 'src/types/district';

import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { DistrictNewEditForm } from './district-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  row: IDistrictsWithDivisionItem;
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function DistrictTableRow({ row, selected, onSelectRow, onDeleteRow }: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const editForm = useBoolean();

  const renderEditForm = () => (
    <DistrictNewEditForm currentDistrict={row} open={editForm.value} onClose={editForm.onFalse} />
  );

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
            editForm.onTrue();
            menuActions.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

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

  const renderConfirmDialog = () => (
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
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
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

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.division.name}</TableCell>

        <TableCell>{fDate(row.createdAt)}</TableCell>

        <TableCell>
          <Stack spacing={0.5}>
            <Box component="span">{fDate(row.updatedAt)}</Box>

            <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
              {fTime(row.updatedAt)}
            </Box>
          </Stack>
        </TableCell>

        <TableCell>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {renderEditForm()}
      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
