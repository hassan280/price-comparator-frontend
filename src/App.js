import SearchBar from "./components/SearchBar.js";
import HomePage from "./pages/HomePage.js";
import ResultsPage from "./pages/ResultsPage.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route ,Routes} from "react-router-dom";
import Login from "./pages/Login.js"
import SignUp from "./pages/SignUp.js"
import FavoritesPage from "./pages/FavoritesPage.js";
function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
          
        
        <Route path='/results/:category/:searchWord' element={<ResultsPage />}/>
        <Route  path="/auth/signin" element={<Login/>}/>
        <Route  path="/auth/signup" element={<SignUp />}/>
        <Route  path="/favorites" element={<FavoritesPage />}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
