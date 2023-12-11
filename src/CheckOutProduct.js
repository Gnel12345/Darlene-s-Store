import React from 'react'
import "./CheckOutProduct.css"
import {useStateValue} from "./StateProvider"


function CheckOutProduct({id, image, title,price,rating}) {

    const removeFromBasket = () =>{
        //remove the item from the basket

        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
            
        })

    }

    const [{basket}, dispatch] = useStateValue();
    return (
        <div className='checkoutProduct'>
                <img className = "checkoutProduct_image"src={image}/>

                <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>

                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                
                <button onClick={removeFromBasket}>Remove From Basket</button>


                </div>
            
        </div>
    )
}

export default CheckOutProduct