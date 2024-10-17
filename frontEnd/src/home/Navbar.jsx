import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

function Navbar() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const {user, logout} = useAuthStore()

    const toggleMenu = () => setMobileOpen(!mobileOpen)

    const {setContentType} = useContentStore()

    
    

  return (
    <>
        <header className="max-w-6xl  flex flex-wrap items-center justify-center h-20">
            <div className="flex items-center gap-10 z-50">
                <Link to="/">
                    <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
                </Link>
                <div className="hidden sm:flex gap-2 items-center">
                    <Link to="/" className="hover:underline" onClick={() => setContentType('movie')}>
                        Movies
                    </Link>
                    <Link to="/" className="hover:underline" onClick={() => setContentType('tv')}>
                        Tv Shows
                    </Link>
                    <Link to="/history" className="hover:underline">
                        Search History
                    </Link>
                </div>

                <div className="flex gap-2 items-center z-50">
                    <Link to={'/search'}>
                        <Search className="size-6 cursor-pointer" />
                    </Link>
                    <img src={user.image} alt="avatar" className="h-8 rounded cursor-pointer" />
                    <LogOut className="size-6 cursor-pointer" onClick={logout} />
                    <div className="sm:hidden ">
                        <Menu className="size-6 cursor-pointer" onClick={toggleMenu}/>
                    </div>
                </div>
            </div>

            {/* mobile navbar  */}

            {mobileOpen && (
                <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
                    <Link to={'/'} className="block hover:underline p-2" onClick={toggleMenu}>
                        Movies
                    </Link>
                    <Link to={'/'} className="block hover:underline p-2" onClick={toggleMenu}>
                        Tv Shows
                    </Link>
                    <Link to={'/history'} className="block hover:underline p-2" onClick={toggleMenu}>
                        Search History
                    </Link>
                </div>
            )}

        </header>
    </>
  )
}

export default Navbar