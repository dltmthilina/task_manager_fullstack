
export interface Data {
    id: number;
    title: string;
    createdDate: Date;
    dueDate: Date;
    status: boolean;
    action: any;
  }

export type Order = 'asc' | 'desc';

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
        numSelected: number;
        onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
        onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
        order: Order;
        orderBy: string;
        rowCount: number;
}

export interface EnhancedTableToolbarProps {
    numSelected: number;
}