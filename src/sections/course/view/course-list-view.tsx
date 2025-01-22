'use client';

import type { TableHeadCellProps } from 'src/components/table';
import type { ICourseTableFilters, ICourseWithCategoryItem } from 'src/types/course';

import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { client } from 'src/lib/trpc';
import { useGetCategories } from 'src/actions/category';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetCoursesWithCategory } from 'src/actions/course';

import { Label } from 'src/components/label';
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

import { CourseTableRow } from '../course-table-row';
import { CourseTableToolbar } from '../course-table-toolbar';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'title', label: 'Course' },
  { id: 'code', label: 'Code' },
  { id: 'duration', label: 'Duration' },
  { id: 'qualification', label: 'Qualification' },
  { id: 'fee', label: 'Fee' },
  { id: 'publish', label: 'Publish' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function CourseListView() {
  const table = useTable();
  const queryClient = useQueryClient();

  const confirmDialog = useBoolean();

  const { categories } = useGetCategories();
  const { coursesWithCategory } = useGetCoursesWithCategory();

  const [tableData, setTableData] = useState<ICourseWithCategoryItem[]>(coursesWithCategory);

  const filters = useSetState<ICourseTableFilters>({
    name: '',
    category: [],
    publish: 'all',
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  useEffect(() => {
    if (coursesWithCategory.length) {
      setTableData(coursesWithCategory);
    }
  }, [coursesWithCategory]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: currentFilters,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name || currentFilters.publish !== 'all' || currentFilters.category.length > 0;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const { mutate: handleDeleteRow } = useMutation({
    mutationFn: async (courseId: string) => {
      await client.course.deleteCourse.$post({ courseId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course deleted!');

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: handleDeleteCourseRows } = useMutation({
    mutationFn: async (courseIds: [string, ...string[]]) => {
      await client.course.deleteCourses.$post({ courseIds });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('All selected courses are deleted!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    const deleteIds = tableData
      .filter((row) => table.selected.includes(row.id))
      .map((row) => row.id);

    if (deleteIds.length > 0) {
      handleDeleteCourseRows(deleteIds as [string, ...string[]]);
    } else {
      toast.error('No courses selected for deletion.');
    }

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
  }, [dataFiltered.length, dataInPage.length, table, tableData, handleDeleteCourseRows]);

  const handleFilterPublish = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      table.onResetPage();
      updateFilters({ publish: newValue });
    },
    [updateFilters, table]
  );

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

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Course list"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Course', href: paths.dashboard.course.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.course.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New course
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={currentFilters.publish}
            onChange={handleFilterPublish}
            sx={[
              (theme) => ({
                px: 2.5,
                boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
              }),
            ]}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === currentFilters.publish) && 'filled') ||
                      'soft'
                    }
                    color={(tab.value === 'published' && 'info') || 'default'}
                  >
                    {['published', 'draft'].includes(tab.value)
                      ? tableData.filter((user) => user.publish === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <CourseTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ categories: categories.map((category) => category.name) }}
          />

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

            <Scrollbar sx={{ minHeight: 444 }}>
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
                      <CourseTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        editHref={paths.dashboard.course.edit(row.id)}
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

      {renderConfirmDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ICourseWithCategoryItem[];
  filters: ICourseTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { publish, name, category } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(({ code, title }) =>
      [code, title].some((field) => field?.toLowerCase().includes(name.toLowerCase()))
    );
  }

  if (category.length) {
    inputData = inputData.filter((course) => category.includes(course.category.name));
  }

  if (publish !== 'all') {
    inputData = inputData.filter((centre) => centre.publish === publish);
  }

  return inputData;
}
