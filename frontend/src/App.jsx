import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Profile from "./pages/Profile/Profile"
import {BrowserRouter,Routes,Route} from "react-router-dom"


const routes=(
  <BrowserRouter>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/> 
      <Route path='/login' exact element={<Login/>}/> 
      <Route path='/signup' exact element={<Signup/>}/> 
      <Route path='/profile' exact element={<Profile/>}/> 
    </Routes>
  </BrowserRouter>
)

function App() {
  return (
    <>
      {routes}
    </>
  )
}

export default App