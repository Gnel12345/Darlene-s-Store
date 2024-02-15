import React from 'react'
import "./Home.css";
import Product from './Product';
import inkjet from"./inkjet.png";
import socks from"./socks.png";
import tmnt from "./tmnt.png";


function Home() {
  

    return (
        <div className = "home">
               <div className = "home__container">
                   
                   
                    
                   

<div className = "home__row">
<Product title ="Teenage Mutant Ninja Turtle Board Game"

price={28.99}
image={socks}
weight={1+"lb"}

/>
<Product
id="1222"
title="Premium Socks"
price={27.99}
image={tmnt}




/>




</div>
<div className="home__row">
          
          
          
          
          
          
          
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            
            image={inkjet}
          />
          <Product
            id="3254354345"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          />
        </div>
      </div>
    </div>
    )
}

export default Home