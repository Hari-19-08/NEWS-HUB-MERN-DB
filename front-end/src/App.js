import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Admin from './pages/admin'
import AdminDash from './pages/adminDashboard'
import AdminNews from './pages/adminnews'
import AdminUsers from './pages/adminuser'
import User from './pages/user'
import MYBooks from './pages/mybooks'
import News from './pages/news'
import Newsuser from './pages/newsuser'
import Newsusers from './pages/newsuseruser'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/dashboard' element={<AdminDash />} />
          <Route path='/admin/news' element={<AdminNews />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/news/:id' element={<News />} />
          <Route path='/newsuser/:id' element={<Newsuser />} />
          <Route path='/newsusers/:id' element={<Newsusers />} />
          <Route path='/mybooks/:id' element={<MYBooks />} />
          {/* <Route path='*' element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;