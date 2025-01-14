'use client';

import type { TableHeadCellProps } from 'src/components/table';
import type { IDistrictItem, IDistrictTableFilters } from 'src/types/district';

import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { client } from 'src/lib/trpc';
import { useGetDistricts } from 'src/actions/district';
import { useGetDivisions } from 'src/actions/division';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { DistrictTableRow } from '../district-table-row';
import { DistrictNewEditForm } from '../district-new-edit-form';
import { DistrictTableToolbar } from '../district-table-toolbar';
import { DistrictTableFiltersResult } from '../district-table-filter-result';

// ----------------------------------------------------------------------

export type ApiResponse = {
  divisions: IDistrictItem[];
};

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'District name' },
  { id: 'divisionName', label: 'Division name', width: 180 },
  { id: 'createdAt', label: 'Created At', width: 220 },
  { id: 'updatedAt', label: 'Updated At', width: 180 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function DistrictListView() {
  const table = useTable();
  const queryClient = useQueryClient();

  const formDialog = useBoolean();
  const confirmDialog = useBoolean();

  const { divisions } = useGetDivisions();
  const { districts } = useGetDistricts();

  const [tableData, setTableData] = useState<IDistrictItem[]>(districts);

  const filters = useSetState<IDistrictTableFilters>({ name: '', divisionName: [] });
  const { state: currentFilters } = filters;

  useEffect(() => {
    if (districts.length) {
      setTableData(districts);
    }
  }, [districts]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!currentFilters.name || currentFilters.divisionName.length > 0;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const { mutate: handleDeleteRow } = useMutation({
    mutationFn: async (districtId: string) => {
      await client.district.deleteDistrict.$post({ districtId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] });
      toast.success('District deleted!');
    },
  });

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {table.selected.length} </strong> items?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          Delete
        </Button>
      }
    />
  );

  const renderFormDialog = () => (
    <DistrictNewEditForm open={formDialog.value} onClose={formDialog.onFalse} />
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="District List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Region', href: paths.dashboard.region.root },
            { name: 'District', href: paths.dashboard.region.district },
            { name: 'List' },
          ]}
          action={
            <Button
              onClick={formDialog.onTrue}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New District
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <DistrictTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ divisionNames: divisions.map((division) => division.name) }}
          />

          {canReset && (
            <DistrictTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirmDialog.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <DistrictTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {renderFormDialog()}
      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IDistrictItem[];
  filters: IDistrictTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { name, divisionName } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((district) =>
      district.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (divisionName.length) {
    inputData = inputData.filter((district) => divisionName.includes(district.divisionName));
  }

  return inputData;
}
