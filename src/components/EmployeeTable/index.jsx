import React from 'react'
import { useTable } from 'react-table'
import styles from './EmployeeTable.module.css'

const EmployeeTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.th}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={styles.tbody}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className={styles.tr}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={styles.td}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default EmployeeTable
