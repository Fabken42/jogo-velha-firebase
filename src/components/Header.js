import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase-config"

export default function Header() {
    const [user] = useAuthState(auth)

    const signOut = () => {
        auth.signOut()
    }

    return (
        <header className="header">
          <Link to="/" className="logo">
            <div className="site-name">Jogo Da Velha</div>
          </Link>
          <nav className="nav-links">
            {user ? (
              <>
                <Link to="/salas" className="nav-link">
                  Salas
                </Link>
                <button className="nav-button" onClick={() => signOut()}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </nav>
        </header>
      );
      
}