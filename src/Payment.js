import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckOutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";

import emailjs from 'emailjs-com';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const [state, setState] = useState({
        customerEmail: "",
        deliveryName: "",
        deliveryLastName: "",
        deliveryAddress: "",
        deliveryCity: "",
        deliveryState: "",
        deliveryPhone: "",
        deliveryZipCode: ""
    });
    const [check, setCheck] = useState(false);

    const shippingRates = {
        "New York, NY": 10.0,
        "Los Angeles, CA": 8.0,
        // Add more city-state pairs and rates as needed
    };

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }

        getClientSecret();
    }, [basket]);

    console.log('THE SECRET IS >>>', clientSecret);
    console.log('👱', user);

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();

        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            console.log('User UID:', user?.uid);
console.log('Basket:', basket);
console.log('Payment Intent ID:', paymentIntent.id);
console.log('Payment Intent Amount:', paymentIntent.amount);
console.log('Payment Intent Created:', paymentIntent.created);

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
           
                });

                


            
            

          

            setSucceeded(true);
            const sendConfirmationEmail = async () => {
                try {
                    const templateParams = {
                        // Define template parameters
                        user_email: state.customerEmail,
                        // Add other parameters as needed
                    };
            
                    // Replace 'your_service_id', 'your_template_id', and 'your_user_id' with your actual values
                    await emailjs.send('service_27csh04', 'template_6tu6q8q', templateParams, 'avQlNKiy6p0oPNrWj');
            
                    console.log('Confirmation email sent successfully');
                } catch (error) {
                    console.error('Error sending confirmation email:', error);
                }
            };

            sendConfirmationEmail();
            
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',
            });

            history.replace('/orders');
        });
    };

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>

                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <form>
                        <h2>Enter your email so you can recieve a confirmation email</h2>
                            <input type="email" name="customerEmail" placeholder="Email" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryName" placeholder="First Name" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryLastName" placeholder="Last Name" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryAddress" placeholder="Address" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryState" placeholder="State" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryCity" placeholder="City" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryZipCode" placeholder="Zip Code" autoComplete="false" onChange={onChange} />
                            <input className="name-Font" type="text" name="deliveryPhone" placeholder="Phone" autoComplete="false" onChange={onChange} />

                            <h1>Delivery Address</h1>
                            <div className="check">
                                <label htmlFor='checkbox' >Same as Delivery Address</label>
                                <input type="checkbox" value="false" name="checkbox" onChange={() => setCheck(!check)} />
                            </div>
                            <input className="name-Font" type="text" name="billingName" placeholder="First Name" autoComplete="false" value={check ? state.deliveryName : ""} />
                            <input className="name-Font" type="text" name="billingLastName" placeholder="Last Name" autoComplete="false" value={check ? state.deliveryLastName : ""} />
                            <input className="name-Font" type="text" name="billingAddress" placeholder="Address" autoComplete="false" value={check ? state.deliveryAddress : ""} />
                            <input className="name-Font" type="text" name="billingState" placeholder="State" autoComplete="false" value={check ? state.deliveryState : ""} />
                            <input className="name-Font" type="text" name="billingCity" placeholder="City" autoComplete="false" value={check ? state.deliveryCity : ""} />
                            <input className="name-Font" type="text" name="deliveryZipCodee" placeholder="Zip Code" autoComplete="false" value={check ? state.deliveryZipCode : ""} />
                            <input className="name-Font" type="text" name="billingPhone" placeholder="Phone" autoComplete="false" value={check ? state.deliveryPhone : ""} />

                        </form>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item.id} // Add a key prop
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                        <h2>Enter test card number 424242424242424</h2>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}
                        <form onSubmit={handleSubmit} >
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
