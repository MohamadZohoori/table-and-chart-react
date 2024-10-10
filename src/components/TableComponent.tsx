import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  TableSortLabel, Checkbox, Paper, TextField
} from '@mui/material';

interface DataItem {
  id: number;
  dessert: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  isHealthy: boolean; // Boolean column
  category: string;   // String column
}

const rows: DataItem[] = [
  { id: 1, dessert: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0, isHealthy: false, category: 'Candy' },
  { id: 2, dessert: 'Jelly Bean', calories: 375, fat: 0, carbs: 94, protein: 0, isHealthy: false, category: 'Candy' },
  { id: 3, dessert: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5, isHealthy: true, category: 'Snack' }, // isHealthy is true here
  { id: 4, dessert: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2, isHealthy: false, category: 'Candy' },
  { id: 5, dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, isHealthy: false, category: 'Dessert' },
  { id: 6, dessert: 'Chocolate Cake', calories: 490, fat: 22, carbs: 75, protein: 5, isHealthy: false, category: 'Dessert' },
  { id: 7, dessert: 'Ice Cream', calories: 207, fat: 11, carbs: 24, protein: 3, isHealthy: false, category: 'Dessert' },
  { id: 8, dessert: 'Brownie', calories: 365, fat: 18, carbs: 55, protein: 4, isHealthy: false, category: 'Dessert' },
  { id: 9, dessert: 'Donut', calories: 452, fat: 25, carbs: 51, protein: 4.5, isHealthy: false, category: 'Dessert' },
  { id: 10, dessert: 'Cheesecake', calories: 321, fat: 18, carbs: 32, protein: 6, isHealthy: false, category: 'Dessert' },
  { id: 11, dessert: 'Muffin', calories: 340, fat: 15, carbs: 50, protein: 5, isHealthy: false, category: 'Dessert' },
  { id: 12, dessert: 'Pancake', calories: 227, fat: 7, carbs: 38, protein: 4, isHealthy: true, category: 'Breakfast' }, // isHealthy is true here
  { id: 13, dessert: 'Cookie', calories: 285, fat: 12, carbs: 37, protein: 3, isHealthy: false, category: 'Dessert' },
];

const TableComponent: React.FC = () => {
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof DataItem>('calories');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterText, setFilterText] = useState('');
  const [filteredRows, setFilteredRows] = useState<DataItem[]>(rows);

  const handleRequestSort = (property: keyof DataItem) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows.map(row => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    setFilterText(filterValue);
    const newFilteredRows = rows.filter(row => row.dessert.toLowerCase().includes(filterValue.toLowerCase()));
    setFilteredRows(newFilteredRows);
    if (newFilteredRows.length < rowsPerPage) {
      setPage(0);
    }
  };

  const sortedFilteredRows = filteredRows.sort((a, b) => {
    if (orderDirection === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    }
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  return (
    <Paper sx={{ width: '90%', height: '80%' }}>
      <TextField
        label="Filter items"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
        sx={{ width: '25%', marginLeft: '1rem' }}
        margin="normal"
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < sortedFilteredRows.length}
                  checked={sortedFilteredRows.length > 0 && selected.length === sortedFilteredRows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell sortDirection={orderDirection}>
                <TableSortLabel
                  active={orderBy === 'calories'}
                  direction={orderDirection}
                  onClick={() => handleRequestSort('calories')}
                >
                  Calories
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderDirection}>
                <TableSortLabel
                  active={orderBy === 'fat'}
                  direction={orderDirection}
                  onClick={() => handleRequestSort('fat')}
                >
                  Fat (g)
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderDirection}>
                <TableSortLabel
                  active={orderBy === 'carbs'}
                  direction={orderDirection}
                  onClick={() => handleRequestSort('carbs')}
                >
                  Carbs (g)
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderDirection}>
                <TableSortLabel
                  active={orderBy === 'protein'}
                  direction={orderDirection}
                  onClick={() => handleRequestSort('protein')}
                >
                  Protein (g)
                </TableSortLabel>
              </TableCell>
              {/* New Boolean and String Columns */}
              <TableCell>Is Healthy</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFilteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => handleSelectClick(row.id)}
                  role="checkbox"
                  selected={selected.includes(row.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(row.id)} />
                  </TableCell>
                  <TableCell>{row.dessert}</TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                  {/* Boolean value displayed as "Yes" or "No" */}
                  <TableCell>{row.isHealthy ? 'Yes' : 'No'}</TableCell>
                  {/* Displaying category */}
                  <TableCell>{row.category}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
