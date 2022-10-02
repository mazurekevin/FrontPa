import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Post from "./components/post/Post";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import Profile from "./components/profile/Profile";
import Navbar_connected from "./components/navbar/Navbar-connected";
import SignOut from "./components/login/SignOut";
import NotFoundError from "./components/exception/NotFoundError";
import ErrorWhileConnected from "./components/exception/ErrorWhileConnected";
import ErrorWhileRegistered from "./components/exception/ErrorWhileRegistered";
import AlreadyConnectedError from "./components/exception/AlreadyConnectedError";
import RegisteredSuccessfully from "./components/exception/RegisteredSuccessfully";
import AddPost from "./components/post/AddPost";
import SavePost from "./components/savePost/SavePost";


function App() {
  const currentRoute = window.location.pathname;
  const token = window.localStorage.getItem("currentUser");


  return (
      <BrowserRouter>
      <Navbar/>
      <div className="container" style={{
                                         backgroundColor: "#E5ECF8"
                                       }}>
      <Routes>
      { token? (<Route path="/" element={<Home/>} />
                         )
                          :
                          (
                          <Route path="/" element={<SignIn/>} />

                          )
                }

          <Route path="/post" element={<Post/>} />
          { token? (<Route path="/signin" element={<AlreadyConnectedError/>} />
                   )
                    :
                    (
                    <Route path="/signin" element={<SignIn/>} />

                    )
          }
          { token? (<Route path="/signup" element={<AlreadyConnectedError/>} />
                             )
                              :
                              (
                              <Route path="/signup" element={<SignUp/>} />

                              )
                    }

          { token? (<Route path="/addPost" element={<AddPost/>} />
                                       )
                                        :
                                        (
                                        <Route path="/addPost" element={<NotFoundError/>} />

                                        )
                              }
          <Route path="/profile/:username" element={<Profile/>} />
          <Route path="/savePost/:username" element={<SavePost/>} />
          <Route path="/signout" element={<SignOut/>} />
          <Route path="/addpost" element={<AddPost/>} />
          <Route path="/404" element={<NotFoundError/>}/>
          <Route path="/errorConnection" element={<ErrorWhileConnected/>}/>
          <Route path="/errorRegister" element={<ErrorWhileRegistered/>}/>
          <Route path="/error" element={<AlreadyConnectedError/>}/>
          <Route path="/success" element={<RegisteredSuccessfully/>}/>

          <Route path="*" element={<NotFoundError/>}/>
        </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
