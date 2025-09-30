'use client'

import { useState } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, SortingState, ColumnFiltersState, VisibilityState } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Download, RefreshCw, Settings2 } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  title?: string
  description?: string
  onRefresh?: () => void
  onExport?: () => void
  isLoading?: boolean
  showSearch?: boolean
  showColumnToggle?: boolean
  showPagination?: boolean
  pageSize?: number
}

export function DataTable<TData, TValue>({ columns, data, searchKey, searchPlaceholder = 'Buscar...', title, description, onRefresh, onExport, isLoading = false, showSearch = true, showColumnToggle = true, showPagination = true, pageSize = 10 }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize } },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {showSearch && searchKey && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder={searchPlaceholder} value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''} onChange={event => table.getColumn(searchKey)?.setFilterValue(event.target.value)} className="pl-8 max-w-sm" />
              </div>
            )}
            {selectedRows.length > 0 && <Badge variant="secondary">{selectedRows.length} seleccionado{selectedRows.length > 1 ? 's' : ''}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            {showColumnToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4" />
                    Columnas
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {table
                    .getAllColumns()
                    .filter(column => column.getCanHide())
                    .map(column => (
                      <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={value => column.toggleVisibility(!!value)}>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="font-medium">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-muted/50">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Cargando...
                      </div>
                    ) : (
                      'No se encontraron resultados.'
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {showPagination && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {selectedRows.length > 0 && <span>{selectedRows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).</span>}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Filas por página</p>
                <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))} className="h-8 w-[70px] rounded border border-input bg-background px-2 text-sm">
                  {[10, 20, 30, 40, 50].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                  <span className="sr-only">Ir a la primera página</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                  <span className="sr-only">Ir a la página anterior</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  <span className="sr-only">Ir a la página siguiente</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                  <span className="sr-only">Ir a la última página</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


