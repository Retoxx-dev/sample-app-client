import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid'
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { User } from '../types/user.type';

const UsersTable = ({users, handleEdit, handleDelete} : {users: any, handleEdit: any, handleDelete: any}) => {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 400 },
        { field: 'email', headerName: 'Email', width: 220 },
        { field: 'first_name', headerName: 'First name', width: 130 },
        { field: 'last_name', headerName: 'Last name', width: 130 },
        {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
        },
        { 
        field: 'actions', 
        headerName: 'Actions',
        width: 130, 
        sortable: false, 
        filterable: false, 
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
            <>
            <IconButton
                aria-label="Edit"
                onClick={() => handleEdit(params.row as User)}
                color="primary"
            >
                <Edit />
            </IconButton>
            <IconButton
                aria-label="Delete"
                onClick={() => handleDelete(params.row.id as string)}
                color="secondary"
            >
                <Delete />
            </IconButton>
            </>
        ),
        },
    ];
    return (
        <>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
            />
        </>
    )
};

export default UsersTable;
