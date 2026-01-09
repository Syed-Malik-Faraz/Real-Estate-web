import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard'
import Finances from "./pages/Finances";
import Properties from "./pages/Properties";
import Tenants from "./pages/Tenatns";

function App() {

  return (
    <>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/properties" element={<Properties />} />
        
        <Route path="/tenants" element={<Tenants />} />
      </Routes>
    </BrowserRouter>

        </>
  )
}

export default App
