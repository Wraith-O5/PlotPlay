import './App.css';
import { HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/Home'
import { Novel } from './Pages/Novel'
import { Comic } from './Pages/Comic'
import { Testing } from './Pages/Testing'
import { Layout } from './Layout';

function App() {
  return (
    <body>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="Novel" element={<Novel/>}/>
            <Route path="/Comic" element={<Comic/>}/>
            <Route path="/Testing" element={<Testing/>}/>
          </Route>
        </Routes>
      </Router> 
    </body>
  )
}

export default App;
