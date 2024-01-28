import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import Base from './components/Base';
import {BrowserRouter,  Routes,Route} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/login';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Services from './Pages/Services';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './Pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfileInfo from './Pages/user-routes/ProfileInfo';
import PostPage from './Pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './Pages/Categories';
import UpdateBlog from './Pages/UpdateBlog';
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer position='bottom-center'/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/About" element={<About/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/post/:postId" element={<PostPage/>}/>
      <Route path="/categories/:categoryId" element={<Categories/>}/>
      
      <Route path="/user" element={<Privateroute />}>
         <Route path="dashboard" element={<Userdashboard/>}/>
         <Route path="profile-info/:userId" element={<ProfileInfo/>}/>
         <Route path="update-blog/:blogId" element={<UpdateBlog/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
