import styles from "../../style/Navbar.module.css"; 
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <nav className={styles.navbar}>
    
      {/* Desktop Navigation */}
      <div className={`${styles.navLinks}`}>
        <Link to="/" className={styles.navLink}>HOME</Link>
        <Link to="/test" className={styles.navLink}>MY Trainners</Link>
        <Link to="/allworkouts" className={styles.navLink}>WORKOUT PLANS</Link>
        <Link to="/saveworkouts" className={styles.navLink}>Save</Link>
      </div>
    </nav>

  )
}

export default NavBar;
