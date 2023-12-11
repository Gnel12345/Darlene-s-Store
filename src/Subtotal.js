import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import {useStateValue} from "./StateProvider"
import { getBasketTotal } from './reducer'
import { useHistory } from 'react-router-dom'


function Subtotal() {
    const history = useHistory();
    const [{basket}, dispatch] = useStateValue();
    console.log(basket);
    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText = {(value) => (
                <>
                <p>
                    Subtotal({basket.length});
                    <strong>${getBasketTotal(basket)}</strong>
                </p>

                
                
                </>

    )}
    decimalScale={2}
    value={0}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"$"}
            
            />
            <button onClick={e => history.push("/payment")}>Proceed to Checkout</button>

           
        </div>
    )
}

export default Subtotal