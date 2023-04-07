import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/read';
import Main from './components/main';
import Edit from './components/edit';
import Add from './components/add';
import Latest from './components/latest';
import Search from './components/search';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
      
          <Route path='/read' element={<Read/>} />
          <Route path='/' element={<Main/>} />
          <Route path='/edit' element={<Edit/>} />
          <Route path='/add' element={<Add/>} />
          <Route path='/latest' element={<Latest/>} />
          <Route path='/search' element={<Search/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;