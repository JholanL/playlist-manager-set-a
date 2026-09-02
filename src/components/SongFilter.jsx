import { FormControl, MenuItem, Select } from '@mui/material'

const choices = ['All', 'Pop', 'Rock', 'Indie', 'Jazz']

export default function SongFilter({ value, onChange }) {
  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Choose a genre"
      >
        {choices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice === 'All' ? 'All genres' : choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
