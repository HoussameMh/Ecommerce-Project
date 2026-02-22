import { NavLink } from "react-router";
import './header.css'

export function Header({isAuth,handleLogout}) {



  return (
    <header>
      <div className="left-side">
        <NavLink to="/" className="header-NavLink">
          <div className="text-NavLink"> Shop</div>
        </NavLink>
        <NavLink to="/newIn" className="header-NavLink">
          <div className="text-NavLink"> New In </div>
        </NavLink>
        <NavLink to="/trending" className="header-NavLink">
          <div className="text-NavLink"> Trending </div>
        </NavLink>
      </div>

      <div className="middle-side">
        <NavLink to="/" className="header-NavLink">
          <div className="logo-container">
            <div className="logo">
              NOVA MARKET
            </div>
          </div>
        </NavLink>
      </div>

      <div className="right-side">
        <NavLink to="/about" className="header-NavLink">
          <div className="text-NavLink">About</div>
        </NavLink>

        <NavLink to="/contact" className="header-NavLink">
          <div className="text-NavLink"> Contact </div>
        </NavLink>

        {isAuth ? (
          <>
            <NavLink to="/cart" className="cart-link">
              <div className="cart-icon-wrapper">
                <i className="fa-solid fa-bag-shopping"></i>
                <span className="cart-badge">0</span>
              </div>
            </NavLink>
            <NavLink to="/profile" className="header-NavLink">
              <div className="btn-container">
                <button className="btn-signin">PROFILE</button>
                <div className="btn-icon-circle">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
            </NavLink>

            <NavLink to="/login" className="header-NavLink" onClick={handleLogout}>
              <div className="btn-container">
                <button className="btn-signin">Log Out</button>
                <div className="btn-icon-circle">
                  <i className="fa-solid fa-arrow-right-from-bracket" ></i>
                </div>
              </div>
            </NavLink>
          </>

        ) : (
          <NavLink to="/login" className="header-NavLink">
            <div className="btn-container">
              <button className="btn-signin">SIGN IN/UP</button>
              <div className="btn-icon-circle">
                <i className="fa-solid fa-lock"></i>
              </div>

            </div>
          </NavLink>
        )
        }
      </div >
    </header >
  )
}