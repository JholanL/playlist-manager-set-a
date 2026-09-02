import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Chip, Container, Typography } from '@mui/material'
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded'
import SongForm from './components/SongForm'
import SongDetails from './components/SongDetails'
import SongFilter from './components/SongFilter'
import SongTable from './components/SongTable'
import { startingSongs } from './data/songs'
import './App.css'

function App() {
  const [songs, setSongs] = useState(startingSongs)
  const [chosenSongId, setChosenSongId] = useState(startingSongs[0].id)
  const [chosenSong, setChosenSong] = useState(startingSongs[0])
  const [genre, setGenre] = useState('All')
  const [message, setMessage] = useState('')

  const shownSongs = useMemo(
    () => (genre === 'All' ? songs : songs.filter((song) => song.genre === genre)),
    [genre, songs],
  )

  useEffect(() => {
    // The chosen song card follows the row selected in the table.
    // oxlint-disable-next-line react-hooks/set-state-in-effect
    setChosenSong(songs.find((song) => song.id === chosenSongId) ?? null)
  }, [chosenSongId, songs])

  const addSong = (song) => {
    setSongs((currentSongs) => [song, ...currentSongs])
    setChosenSongId(song.id)
    setMessage(`${song.title} was added to your playlist.`)
  }

  const changeGenre = (nextGenre) => {
    setGenre(nextGenre)
    const matchingSongs = nextGenre === 'All'
      ? songs
      : songs.filter((song) => song.genre === nextGenre)

    if (!matchingSongs.some((song) => song.id === chosenSongId)) {
      setChosenSongId(matchingSongs[0]?.id ?? null)
    }
  }

  return (
    <Box className="page">
      <Container maxWidth="xl">
        <Box component="header" className="header">
          <Box className="logo"><HeadphonesRoundedIcon /></Box>
          <Box>
            <Typography component="h1" variant="h5" fontWeight={800}>My Playlist</Typography>
            <Typography variant="body2" color="text.secondary">Keep your favorite tracks in one place.</Typography>
          </Box>
        </Box>

        <Box component="main" className="main">
          <Box className="intro">
            <Typography variant="overline" color="primary">New track</Typography>
            <Typography component="h2" variant="h3">Add a Track</Typography>
            <Typography color="text.secondary">Fill in the details below to save a track.</Typography>
          </Box>

          {message && <Alert severity="success" onClose={() => setMessage('')} sx={{ mb: 2 }}>{message}</Alert>}
          <SongForm onAdd={addSong} />

          <Box className="list-heading">
            <Box>
              <Typography component="h2" variant="h4" fontWeight={800}>Track List</Typography>
              <Typography color="text.secondary">Choose a track by clicking its row.</Typography>
            </Box>
            <Box className="list-actions">
              <Chip label={`${shownSongs.length} tracks`} color="primary" variant="outlined" />
              <SongFilter value={genre} onChange={changeGenre} />
            </Box>
          </Box>

          <Box className="songs-area">
            <SongTable
              songs={shownSongs}
              chosenSongId={chosenSongId}
              onChoose={setChosenSongId}
            />
            <SongDetails song={chosenSong} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default App
