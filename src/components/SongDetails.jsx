import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded'
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded'

export default function SongDetails({ song }) {
  if (!song) {
    return (
      <Paper className="song-details empty-details" variant="outlined">
        <AlbumRoundedIcon />
        <Typography color="text.secondary">Choose a track to see its details.</Typography>
      </Paper>
    )
  }

  return (
    <Paper className="song-details" variant="outlined">
      <Box className="album-cover">
        <AlbumRoundedIcon />
        <span />
      </Box>

      <Typography variant="overline" color="primary">Chosen Track</Typography>
      <Typography component="h3" variant="h4" fontWeight={800}>{song.title}</Typography>
      <Typography color="text.secondary">{song.artist}</Typography>

      <Stack direction="row" spacing={1} my={2}>
        <Chip label={song.genre} variant="outlined" />
        <Chip
          label={song.role}
          color={song.role === 'Creator' ? 'primary' : 'default'}
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box className="detail-row">
        <span><EqualizerRoundedIcon /> Rating / BPM</span>
        <strong>{song.score}/100</strong>
      </Box>
      <Box className="detail-row">
        <span>Record Label Name</span>
        <strong>{song.label}</strong>
      </Box>
    </Paper>
  )
}
