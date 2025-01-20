import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar.js'
import Home from './Home.js';
import Predictions from './Predictions.js'
import Videos from './Videos.js'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='UFC_Analytics/' exact element={<Home />} />
          <Route path='UFC_Analytics/predictions' exact element={<Predictions />} />
          <Route path='UFC_Analytics/video-analytics' exact element={<Videos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
