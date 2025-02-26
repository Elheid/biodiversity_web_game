import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { StartGame } from './components/pages/StartGame'
import { MainPage } from './components/pages/MainPage'
import { EndGame } from './components/pages/EndGame'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<StartGame />} />
        <Route path="/end/:score" element={<EndGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
