import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Calculator from "./pages/Calculator/Calculator.tsx";
import WeatherApp from "./pages/WeatherApp/WeatherApp.tsx";
import Media from "./pages/Media/Media.tsx";
import Recipes from "./pages/Recipes/Recipes.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/Calculator" element={<Calculator />}/>
              <Route path="/WeatherApp" element={<WeatherApp />}/>
              <Route path="/Media" element={<Media />}/>
              <Route path="Recipes" element={<Recipes />}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App
