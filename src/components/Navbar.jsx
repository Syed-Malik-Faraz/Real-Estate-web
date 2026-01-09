import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    return (
    <div>
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/90 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/resources/logo.png" alt="PropertyVision" className="h-10" />
            <h1 className="text-2xl font-bold cursor-pointer" onClick={()=>{ navigate('/') } }>
                PropertyVision
                </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="accountant">Accountant</option>
            </select> */}
            <div >
              <li className="flex items-center justify-center gap-6 text-lg" >
 <button>
  <ul><a href='' onClick={()=>{
    navigate('/')
  }}>  Home  </a></ul>
</button>
<button onClick={()=>navigate("/properties")}>
  <ul> Properties</ul>
 </button>
<button onClick={()=>navigate("/finances")}>
  <ul> Finances</ul>
 </button>

<button onClick={()=>navigate("/tenants")}>
  <ul> Tenants</ul>
 </button>

</li>
</div>


            {/* <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div> */}

<div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white">
                ss
              </div>

          </div>
        </div>
      </nav>
</div>
  )
}

export default Navbar