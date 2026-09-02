import { useState } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded'
import SongForm from './components/SongForm'
import './App.css'

function App() {
  const [songs, setSongs] = useState([])
  const [message, setMessage] = useState('')

  const addSong = (song) => {
    setSongs((currentSongs) => [...currentSongs, song])
    setMessage(`${song.title} was added to your playlist.`)
  }

  return (
    <Box className="page">
      <Container maxWidth="md">
        <Box component="header" className="header">
          <Box className="logo"><HeadphonesRoundedIcon /></Box>
          <Box>
            <Typography component="h1" variant="h5" fontWeight={800}>My Playlist</Typography>
            <Typography variant="body2" color="text.secondary">Keep your favorite songs in one place.</Typography>
          </Box>
        </Box>

        <Box component="main" className="main">
          <Box className="intro">
            <Typography variant="overline" color="primary">New song</Typography>
            <Typography component="h2" variant="h3">Add a song</Typography>
            <Typography color="text.secondary">Fill in the details below to save a song.</Typography>
          </Box>

          {message && <Alert severity="success" onClose={() => setMessage('')} sx={{ mb: 2 }}>{message}</Alert>}
          <SongForm onAdd={addSong} />

          <Typography className="song-count" variant="body2" color="text.secondary">
            Songs added: {songs.length}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default App
