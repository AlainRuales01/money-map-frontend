import React from 'react';

export interface Column<T> {
    key: keyof T | string; 
    label: string;
    render?: (value: unknown, row: T) => React.ReactNode; 
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    actionComponent?: (row: T) => React.ReactNode;
    getRowKey?: (row: T) => string | number; 
}

const Table = <T extends object>({
    columns,
    data,
    actionComponent,
    getRowKey
}: TableProps<T>) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.key)} className="px-4 py-2 text-left border bg-black">
                            {col.label}
                        </th>
                    ))}
                    {actionComponent && <th className="px-4 py-2 text-left border bg-black"></th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => {
                    const rowKey = getRowKey ? getRowKey(row) : rowIndex;

                    return (
                        <tr key={rowKey} className="border-t hover:bg-gray-50 transition-colors">
                            {columns.map((col) => {
                                const rowRecord = row as Record<string, unknown>;
                                const cellValue = rowRecord[String(col.key)];
                                
                                return (
                                    <td key={String(col.key)} className="px-4 py-2 border">
                                        {col.render 
                                            ? col.render(cellValue, row) 
                                            : typeof cellValue === 'object' && cellValue !== null
                                                ? JSON.stringify(cellValue) 
                                                : String(cellValue ?? '')} 
                                        {}
                                    </td>
                                );
                            })}
                            {actionComponent && (
                                <td className="px-4 py-2 border text-center">
                                    {actionComponent(row)}
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;