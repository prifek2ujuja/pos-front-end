'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table'

import { IoSearchSharp } from 'react-icons/io5'
import { ReactNode, useState } from 'react'
import { DataTablePagination } from './DataTablePagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isSearchable: boolean
  searchField?: string
  searchFieldPlaceholder?: string
  noResultText?: string | ReactNode
}

function DataTable<TData, TValue>({
  columns,
  data,
  isSearchable,
  searchField,
  searchFieldPlaceholder,
  noResultText,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="p-0 m-0">
      <div className="flex items-center">
        {isSearchable && searchField && (
          <div className="border relative mb-4 bg-card border-white rounded-md flex items-center">
            <input
              placeholder={searchFieldPlaceholder}
              value={(table.getColumn(searchField)?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn(searchField)?.setFilterValue(event.target.value)}
              className="max-w-sm focus:border-none rounded-md p-1 border bg-light-gray focus:outline-none"
            />
            <IoSearchSharp className="absolute right-3" />
          </div>
        )}
      </div>
      <Table className="rounded-2xl">
        <TableHeader className="p-0 m-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="p-0 m-0">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-left">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-left py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noResultText ? noResultText : 'No result'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > 10 && (
        <div className="w-full my-10">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  )
}

export default DataTable
