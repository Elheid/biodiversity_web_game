import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { GameRoundFirst } from './components/pages/GameRoundFirst'
import { MainPage } from './components/pages/MainPage'
import { GameEnd } from './components/pages/GameEnd'
import { DisbleButtonsProvider } from './context/DisbleButtonsProvider'
import { GameRoundSecond } from './components/pages/GameRoundSecond'
import { RoundEndProvider } from './context/RoundEndProvider'

import { RoundStart } from './components/pages/RoundStart'
import { GameProvider } from './context/GameContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    },
  });

  return (
    <GameProvider>


    <QueryClientProvider client={queryClient}>
    <DisbleButtonsProvider>
        <RoundEndProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/first-round-start" element={<RoundStart />} />

              <Route path="/first-round" element={<GameRoundFirst />} />

              <Route path="/second-round-start/:firstScore" element={<RoundStart />} />

              <Route path="/second-round/:firstScore" element={<GameRoundSecond />} />
              <Route path="/end/:firstScore/:secondScore" element={<GameEnd />} />



            </Routes>
          </BrowserRouter>
        </RoundEndProvider>
      </DisbleButtonsProvider>

    </QueryClientProvider>
    </GameProvider>

  )
}

export default App
