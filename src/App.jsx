import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
// import { Layout } from './components/Layout.jsx'
// import { About } from './pages/About.jsx'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
