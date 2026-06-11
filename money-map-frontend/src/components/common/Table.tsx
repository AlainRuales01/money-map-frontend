interface TableProps<T> {
    columns: {
        key: keyof T;
        label: string;
    }[];
    data: T[];
    actionComponent?: (row: T) => React.ReactNode;
}

const Table = <T extends object>({
    columns,
    data,
    actionComponent
} : TableProps<T>) => {
    return(
        <table>
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={String(col.key)} className="px-4 py-2 text-left border">
                            {col.label}
                        </th>
                    )
                    )}
                    {actionComponent && <th className="px-4 py-2 text-left border">Acciones</th>}
                </tr>
            </thead>
            <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t">
            {columns.map((col) => (
              <td key={String(col.key)} className="px-4 py-2 border">
                {row[col.key] as React.ReactNode}
              </td>
            ))}
            {actionComponent && (
                <td className="px-4 py-2 border">{actionComponent(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
        </table>
    )
};

export default Table;