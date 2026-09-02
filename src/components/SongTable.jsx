import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

export default function SongTable({ songs, chosenSongId, onChoose }) {
  const [page, setPage] = useState({ pageIndex: 0, pageSize: 5 })

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Track Title',
      cell: ({ row, getValue }) => (
        <Box>
          <Typography fontWeight={700}>{getValue()}</Typography>
          <Typography variant="caption" color="text.secondary">{row.original.label}</Typography>
        </Box>
      ),
    },
    { accessorKey: 'artist', header: 'Artist Name' },
    {
      accessorKey: 'genre',
      header: 'Genre',
      cell: ({ getValue }) => <Chip label={getValue()} size="small" variant="outlined" />,
    },
    { accessorKey: 'score', header: 'Rating / BPM' },
    { accessorKey: 'role', header: 'User Role' },
  ], [])

  // TanStack Table provides the rows and page controls used below.
  // oxlint-disable-next-line react/incompatible-library
  const table = useReactTable({
    data: songs,
    columns,
    state: { pagination: page },
    onPaginationChange: setPage,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <Paper className="song-list" variant="outlined">
      <TableContainer>
        <Table aria-label="Song list">
          <TableHead>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                selected={row.original.id === chosenSongId}
                onClick={() => onChoose(row.original.id)}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') onChoose(row.original.id)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="page-buttons">
        <Typography variant="body2" color="text.secondary">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Typography>
        <Box>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}
