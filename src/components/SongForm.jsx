import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

const blankSong = {
  title: '',
  genre: '',
  artist: '',
  score: '',
  label: '',
  role: '',
}

function checkSong(song) {
  const errors = {}

  if (song.title.trim().length < 3) errors.title = 'Enter at least 3 letters.'
  if (!song.genre) errors.genre = 'Choose a genre.'
  if (song.artist.trim().length < 3) errors.artist = 'Enter at least 3 letters.'
  if (song.score === '' || Number(song.score) < 1 || Number(song.score) > 100) {
    errors.score = 'Enter a number from 1 to 100.'
  }
  if (!song.label.trim()) errors.label = 'Enter the record label.'
  if (!song.role) errors.role = 'Choose one.'

  return errors
}

export default function SongForm({ onAdd }) {
  const [song, setSong] = useState(blankSong)
  const [visited, setVisited] = useState({})
  const errors = checkSong(song)

  const changeField = (name) => (event) => {
    setSong((currentSong) => ({ ...currentSong, [name]: event.target.value }))
    setVisited((currentVisited) => ({ ...currentVisited, [name]: true }))
  }

  const submitSong = (event) => {
    event.preventDefault()
    setVisited(Object.fromEntries(Object.keys(blankSong).map((name) => [name, true])))

    if (Object.keys(errors).length > 0) return

    onAdd({
      ...song,
      id: crypto.randomUUID(),
      score: Number(song.score),
    })
    setSong(blankSong)
    setVisited({})
  }

  return (
    <Paper component="form" className="song-form" variant="outlined" onSubmit={submitSong} noValidate>
      <Box className="form-title">
        <Typography variant="h5" fontWeight={750}>Track Details</Typography>
        <Typography variant="body2" color="text.secondary">Please complete every field.</Typography>
      </Box>

      <Box className="fields">
        <TextField
          label="Track Title"
          value={song.title}
          onChange={changeField('title')}
          error={visited.title && Boolean(errors.title)}
          helperText={visited.title && errors.title}
        />

        <TextField
          select
          label="Genre"
          value={song.genre}
          onChange={changeField('genre')}
          error={visited.genre && Boolean(errors.genre)}
          helperText={visited.genre && errors.genre}
        >
          {['Pop', 'Rock', 'Indie', 'Jazz'].map((genre) => (
            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Artist Name"
          value={song.artist}
          onChange={changeField('artist')}
          error={visited.artist && Boolean(errors.artist)}
          helperText={visited.artist && errors.artist}
        />

        <TextField
          label="Rating / BPM"
          type="number"
          value={song.score}
          onChange={changeField('score')}
          error={visited.score && Boolean(errors.score)}
          helperText={visited.score && errors.score}
          slotProps={{ htmlInput: { min: 1, max: 100 } }}
        />

        <TextField
          label="Record Label Name"
          value={song.label}
          onChange={changeField('label')}
          error={visited.label && Boolean(errors.label)}
          helperText={visited.label && errors.label}
        />

        <FormControl error={visited.role && Boolean(errors.role)}>
          <FormLabel>User Role</FormLabel>
          <RadioGroup row value={song.role} onChange={changeField('role')}>
            <FormControlLabel value="Creator" control={<Radio />} label="Creator" />
            <FormControlLabel value="Listener" control={<Radio />} label="Listener" />
          </RadioGroup>
          {visited.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>
      </Box>

      <Button type="submit" variant="contained" size="large" startIcon={<AddRoundedIcon />}>
        Add Track
      </Button>
    </Paper>
  )
}
