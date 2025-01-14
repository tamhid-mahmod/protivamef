'use client';

import type { IDivisionItem } from 'src/types/division';
import type { TableHeadCellProps } from 'src/components/table';

import { useBoolean, usePopover } from 'minimal-shared/hooks';
import { useQuery, useMutation, useQueryClient, type UseQueryResult } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';

import { client } from 'src/lib/trpc';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { DivisionNewEditForm } from '../division-new-edit-form';

// ----------------------------------------------------------------------

export type ApiResponse = {
  divisions: IDivisionItem[];
};

// ----------------------------------------------------------------------

export function DivisionListView() {
  const newForm = useBoolean();
  const queryClient = useQueryClient();

  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage } = useTable({
    defaultRowsPerPage: 10,
  });

  const { data: divisionsData, isPending: isDivisionsLoading }: UseQueryResult<ApiResponse> =
    useQuery({
      queryKey: ['divisions'],
      queryFn: async () => {
        const res = await client.division.getDivisions.$get();
        return await res.json();
      },
    });

  const notFound = !isDivisionsLoading && !divisionsData?.divisions?.length;

  const { mutate: deleteDivision } = useMutation({
    mutationFn: async (divisionId: string) => {
      await client.division.deleteDivision.$post({ divisionId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['divisions'] });
      toast.success('Division deleted!');
    },
  });

  const headCells: TableHeadCellProps[] = [
    { id: 'name', label: 'Division' },
    { id: 'createdAt', label: 'Created At' },
    { id: '' },
  ];

  const renderNewEditForm = () => (
    <DivisionNewEditForm open={newForm.value} onClose={newForm.onFalse} />
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Division List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Region', href: paths.dashboard.region.root },
            { name: 'Division', href: paths.dashboard.region.division },
            { name: 'List' },
          ]}
          action={
            <Button
              onClick={newForm.onTrue}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Division
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <CardHeader title="Details" sx={{ mb: 3 }} />

          <Scrollbar sx={{ height: 400 }}>
            <Table stickyHeader sx={{ minWidth: 800 }}>
              <TableHeadCustom headCells={headCells} />

              <TableBody>
                {isDivisionsLoading ? (
                  <TableSkeleton
                    rowCount={rowsPerPage}
                    cellCount={headCells.length}
                    sx={{ height: 69 }}
                  />
                ) : (
                  <>
                    {divisionsData?.divisions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <RowItem
                          key={row.id}
                          row={row}
                          onDeleteRow={() => deleteDivision(row.id)}
                        />
                      ))}

                    <TableNoData notFound={notFound} />
                  </>
                )}
              </TableBody>
            </Table>
          </Scrollbar>

          <Divider />

          <TablePaginationCustom
            rowsPerPage={rowsPerPage}
            page={isDivisionsLoading ? 0 : page}
            onPageChange={onChangePage}
            count={isDivisionsLoading ? 0 : (divisionsData?.divisions.length ?? 0)}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {renderNewEditForm()}
    </>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: IDivisionItem;
  onDeleteRow: () => void;
};

function RowItem({ row, onDeleteRow }: RowItemProps) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();
  const editForm = useBoolean();

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

  const renderNewEditForm = () => (
    <DivisionNewEditForm currentDivision={row} open={editForm.value} onClose={editForm.onFalse} />
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

  return (
    <>
      <TableRow>
        <TableCell sx={{ flexGrow: 1 }}>{row.name}</TableCell>
        <TableCell>{fDate(row.createdAt)}</TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {renderMenuActions()}
      {renderNewEditForm()}
      {renderConfirmDialog()}
    </>
  );
}
