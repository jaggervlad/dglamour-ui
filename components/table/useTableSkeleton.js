import {
  makeStyles,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableSortLabel,
  TablePagination,
  TableContainer,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontSize: 14,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));
export default function useTableSkeleton(headCells) {
  const classes = useStyles();

  const TblContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align="center">
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    TblContainer,
    TblHead,
  };
}
