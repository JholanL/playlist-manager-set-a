import { useState } from 'react'
import { Alert, Box, Chip, Container, Typography } from '@mui/material'
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded'
import SongForm from './components/SongForm'
import SongTable from './components/SongTable'
import { startingSongs } from './data/songs'
import './App.css'

function App() {
  const [songs, setSongs] = useState(startingSongs)
  const [chosenSongId, setChosenSongId] = useState(startingSongs[0].id)
  const [message, setMessage] = useState('')

  const addSong = (song) => {
    setSongs((currentSongs) => [song, ...currentSongs])
    setChosenSongId(song.id)
    setMessage(`${song.title} was added to your playlist.`)
  }

  return (
    <Box className="page">
      <Container maxWidth="xl">
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

          <Box className="list-heading">
            <Box>
              <Typography component="h2" variant="h4" fontWeight={800}>Song list</Typography>
              <Typography color="text.secondary">Choose a song by clicking its row.</Typography>
            </Box>
            <Chip label={`${songs.length} songs`} color="primary" variant="outlined" />
          </Box>

          <SongTable
            songs={songs}
            chosenSongId={chosenSongId}
            onChoose={setChosenSongId}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default App
