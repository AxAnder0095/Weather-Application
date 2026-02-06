import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
