import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tasks from "../../tasks.json"
import { EnhancedTableToolbar } from './EnhancedToolbar';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Data, Order } from './TypesforTable';

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';
import { TaskModel } from '../../models/TaskModel';
import { UserService } from '../../services/UserService';
import { TaskService } from '../../services/TaskService';

interface IProps {
  tasks: TaskModel[] | undefined;
}

export default function TaskTable({tasks}: IProps) {

  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('createdDate');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(tasks);

  React.useEffect(()=>{
    setRows(tasks)
  },[tasks]);

  React.useEffect(()=>{
    console.log(rows)
  },[rows])

  const deleteHandler = async(row_id:string) => {
       await TaskService.deleteTask(row_id)
        .then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            //size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={()=>{}}
              onRequestSort={()=>{}}
              rowCount={5}
            />
            <TableBody>
              {rows?.map((row, index) => {
                
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={row.id}
                    selected={false}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={false}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{}</TableCell>
                    <TableCell align="left">{row?.dueDate?.toDateString()}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                        <div className='flex space-x-2'>
                          <VisibilityIcon fontSize="small" onClick={()=>navigate(`/edit-task/${row.id}`)}/>
                          <EditIcon fontSize="small" onClick={()=>navigate(`/edit-task/${row.id}`)}/>
                          <DeleteIcon fontSize="small" onClick ={()=>deleteHandler(row.id!)}/>
                        </div>
                    </TableCell>
                  </TableRow>
                );
              })}
             
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
    </Box>
  );
}