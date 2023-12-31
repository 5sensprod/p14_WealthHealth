import React from 'react'
import { useTable, usePagination, useSortBy, useFilters } from 'react-table'
import { useSelector } from 'react-redux'
import styles from './EmployeeTable.module.css'
import { formatDate } from '../../utils/formatDate'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

/**
 * Tableau affichant une liste d'employés.
 */
const EmployeeTable = ({ dateFormat = 'MM/DD/YYYY' }) => {
  const employees = useSelector((state) => state.employee.employees)

  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ value }) => formatDate(value, dateFormat),
      },
      {
        Header: 'Date of Birth',
        accessor: 'dateOfBirth',
        Cell: ({ value }) => {
          console.log('Raw Value:', value)
          return formatDate(value, dateFormat)
        },
      },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    [dateFormat],
  )

  const initialState = {
    pageIndex: 0,
    pageSize: 2,
  }

  // filterTypes
  const filterTypes = React.useMemo(
    () => ({
      global: (rows, ids, filterValue) => {
        return rows.filter((row) => {
          return ids.some((id) => {
            const rowValue = row.values[id]
            return (
              rowValue &&
              String(rowValue)
                .toLowerCase()
                .includes(String(filterValue).toLowerCase())
            )
          })
        })
      },
    }),
    [],
  )
  const [filterValue, setFilterValue] = React.useState('')

  const filteredData = React.useMemo(() => {
    if (!filterValue) return employees

    return employees.filter((row) => {
      return columns.some((column) => {
        const rowValue = row[column.accessor]
        return rowValue
          ? String(rowValue).toLowerCase().includes(filterValue.toLowerCase())
          : false
      })
    })
  }, [employees, filterValue, columns])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data: filteredData, initialState, filterTypes },
    useFilters,
    useSortBy,
    usePagination,
  )

  return (
    <>
      <label htmlFor="searchInput"></label>
      <input
        id="searchInput"
        className={styles.filterInput}
        value={filterValue}
        onChange={(e) => {
          setFilterValue(e.target.value)
        }}
        placeholder={'Search...'}
      />
      <div className={styles.tableWrapper}>
        <table {...getTableProps()} className={styles.table}>
          <thead className={styles.thead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className={styles.tr}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={styles.th}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaCaretDown color="#002905" />
                        ) : (
                          <FaCaretUp color="#002905" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={styles.tbody}>
            {page.map((row) => {
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
      </div>
      {filteredData.length === 0 && filterValue && (
        <div className={styles.noDataMessage}>No matching records found</div>
      )}
      <div className={styles.pagination}>
        <div className={styles.paginationControls}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>

        <div className={styles.paginationSettings}>
          <span>
            <label htmlFor="gotoPageInput">Go to page </label>
            <input
              id="gotoPageInput"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '30px', marginRight: '10px' }}
            />
          </span>{' '}
          <select
            name="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
            style={{
              fontSize: '16px',
              color: '#2c3e50',
              background: 'white',
              border: '1px solid gray',
            }}
          >
            {[2, 4, 6, 8, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default EmployeeTable
