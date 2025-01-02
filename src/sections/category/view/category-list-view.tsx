'use client';

import type { ICategoryItem } from 'src/types/category';
import type { TableHeadCellProps } from 'src/components/table';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemIcon from '@mui/material/ListItemIcon';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { fetcher } from 'src/lib/axios';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableNoData,
  TableSkeleton,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

// ----------------------------------------------------------------------

export type ApiResponse = {
  category: ICategoryItem[];
  totalPages: number;
  totalItems: number;
};

const createBaseEndpoint = (page = 1, rowsPerPage = 5) =>
  `/api/pagination?page=${page}&perPage=${rowsPerPage}`;

// ----------------------------------------------------------------------

export function CategoryListView() {
  const { page, rowsPerPage, onChangeRowsPerPage, onChangePage } = useTable();

  const defaultEndpoint = createBaseEndpoint();
  const [endpoint, setEndpoint] = useState(defaultEndpoint);

  const { data, isLoading } = useSWR<ApiResponse>(endpoint, fetcher, {
    keepPreviousData: true,
  });

  useEffect(() => {
    const updatedEndpoint = createBaseEndpoint(page + 1, rowsPerPage);

    setEndpoint(updatedEndpoint);
  }, [page, rowsPerPage]);

  const notFound = !data?.category.length;

  const headCells: TableHeadCellProps[] = [
    { id: 'name', label: 'Category' },
    { id: 'description', label: 'Description', width: 500 },
    { id: 'createdAt', label: 'Created At' },
    { id: '' },
  ];

  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <CustomBreadcrumbs
        heading="Category list"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Course', href: paths.dashboard.course.root },
          { name: 'Category', href: paths.dashboard.course.category.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.course.category.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New category
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

        <Table>
          <TableHeadCustom headCells={headCells} />

          <TableBody>
            {isLoading ? (
              <TableSkeleton
                rowCount={rowsPerPage}
                cellCount={headCells.length}
                sx={{ height: 69 }}
              />
            ) : (
              <>
                {notFound ? (
                  <TableNoData notFound={notFound} />
                ) : (
                  data?.category.map((row) => <RowItem key={row.id} row={row} />)
                )}
              </>
            )}
          </TableBody>
        </Table>

        <Divider />

        <TablePaginationCustom
          rowsPerPage={rowsPerPage}
          page={isLoading ? 0 : page}
          onPageChange={onChangePage}
          count={isLoading ? 0 : (data?.totalItems ?? 0)}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: ICategoryItem;
};

function RowItem({ row }: RowItemProps) {
  const menuActions = usePopover();

  const handleDelete = () => {
    menuActions.onClose();
    console.info('DELETE', row.id);
  };

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem>
          <Link
            component={RouterLink}
            href={paths.dashboard.course.category.edit(row.id)}
            underline="none"
            color="inherit"
            sx={{ width: 1, display: 'flex', alignItems: 'center' }}
          >
            <ListItemIcon sx={{ margin: 0 }}>
              <Iconify icon="solar:pen-bold" />
            </ListItemIcon>
            Edit
          </Link>
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <TableRow>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <Typography
            sx={[
              (theme) => ({
                ...theme.mixins.maxLine({ line: 2 }),
              }),
            ]}
            variant="body2"
          >
            {row.description}
          </Typography>
        </TableCell>
        <TableCell>{fDate(row.createdAt)}</TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {renderMenuActions()}
    </>
  );
}
