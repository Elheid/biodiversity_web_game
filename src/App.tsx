import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'

import { MainPage } from './components/pages/MainPage'
import { GameEnd } from './components/pages/GameEnd'
import { DisbleButtonsProvider } from './context/DisbleButtonsProvider'

import { RoundEndProvider } from './context/RoundEndProvider'

import { RoundStart } from './components/pages/RoundStart'
import { GameProvider } from './context/GameContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GameType } from './interfaces/rounds'
import { GamePointsProvider } from './context/GamePointsProvider'
import { InterEnd } from './components/pages/InterEnd'
import { BaseOfGame } from './components/pages/BaseOfGame'
import { ChoiceLevel } from './components/pages/ChoiceLevel'
import { LanguageProvider } from './context/LanguageProvider'
//import {DialogLanguageChange} from './components/DialogLanguageChange'


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
        <LanguageProvider>

          <GamePointsProvider>
            <DisbleButtonsProvider>
              <RoundEndProvider>
                <BrowserRouter basename="/">
                {/*<DialogLanguageChange myStyle={{position:"absolute", top:0, left:0}} />*/}
                  <Routes>
                    <Route path="/" element={<MainPage />} />

                    <Route path="/choice-level" element={<ChoiceLevel />} />


                    <Route path="/first-round-start" element={<RoundStart roundType={GameType.firstType} />}>
                      <Route path="/first-round-start/:onlyFirst" element={<RoundStart roundType={GameType.firstType} />}></Route>
                    </Route>

                    <Route path="/first-round" element={<BaseOfGame />}>
                      <Route path="/first-round/:onlyFirst" element={<BaseOfGame />} />
                    </Route>

                    <Route path="/first-round/:onlyFirst" element={<BaseOfGame />} />


                    <Route path="/first-round" element={<BaseOfGame />} />

                    <Route path="/first-round-end" element={<InterEnd />} />


                    <Route path="/second-round-start" element={<RoundStart roundType={GameType.secondType} />} />

                    <Route path="/second-round" element={<BaseOfGame gameType={GameType.secondType} />} />
                    <Route path="/end" element={<GameEnd />} />



                  </Routes>
                </BrowserRouter>
              </RoundEndProvider>
            </DisbleButtonsProvider>
          </GamePointsProvider>

        </LanguageProvider>

      </QueryClientProvider>
    </GameProvider>

  )
}

export default App
