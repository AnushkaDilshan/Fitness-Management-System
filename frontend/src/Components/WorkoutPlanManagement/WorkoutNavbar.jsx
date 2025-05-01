import styles from "../../style/Navbar.module.css"; 
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <nav className={styles.navbar}>
    
      {/* Desktop Navigation */}
      <div className={`${styles.navLinks}`}>
        <Link to="/dalltrainers" className={styles.navLink}>HOME</Link>
        <Link to="/viewmytrainers" className={styles.navLink}>MY TRAINERS</Link>
        <Link to="/allworkouts" className={styles.navLink}>WORKOUT PLANS</Link>
        <Link to="/saveworkouts" className={styles.navLink}>SAVE</Link>
      </div>
    </nav>

  )
}

export default NavBar;
