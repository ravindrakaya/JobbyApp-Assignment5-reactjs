import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <nav>
        <Link to="/" className="link-class">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </nav>

      <ul className="header-text-container">
        <Link to="/" className="link-class">
          <li>
            <nav className="header-text">Home</nav>
          </li>
        </Link>
        <Link to="/jobs" className="link-class">
          <li>
            <nav className="header-text">Jobs</nav>
          </li>
        </Link>
        <nav>
          <Link to="/login" className="link-class">
            <li>
              <button
                className="logout-btn"
                data-testid="searchButton"
                type="button"
                onClick={onClickLogoutBtn}
              >
                Logout
              </button>
            </li>
          </Link>
        </nav>
      </ul>
    </div>
  )
}

export default withRouter(Header)
