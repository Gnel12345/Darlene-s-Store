import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { faHome,faShoppingCart, faDove } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }
  return (
    <header>
      <div className="header-container">
        <div className="header-background"></div>
        
        
       
       
       
        
        <FontAwesomeIcon icon={faDove} className="bird-icon" role="img" aria-label="bird" />
         <h1 className="header-title">Grandkids Galor</h1>
         <h3>This website is not a real website yet</h3>
         <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
  <Link to={!user && '/login'}>
    <div onClick={handleAuthenticaton} className="header__option">
      <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
      <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
    </div>
  </Link>
  </div>
      
      <nav>
        <ul>
          <li>
            <a href="/">
            <FontAwesomeIcon icon={faHome} />
              Home</a>
          </li>
      
      
      
      
      
        
          
          
          
          
          <li>
            <a href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
              Cart</a>
          </li>
          <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
          
          
          
          
        </ul>
      </nav>
      </div>
      
  

  
      
      
      
      
      
      
      
      

      
    </header>
    
    
    
    
    
    
    
    
  )
}

export default Header