import styles from "../../style/Navbar.module.css"; 
import { Link } from "react-router-dom";

function NavBar() {

  return (
    <nav className={styles.navbar}>
    
      {/* Desktop Navigation */}
      <div className={`${styles.navLinks}`}>
        <Link to="/workout-plan-details" className={styles.navLink}>HOME</Link>
        <Link to="/myappoinments" className={styles.navLink}>MY BOOKING</Link>
      
      </div>
    </nav>

  )
}

export default NavBar;
