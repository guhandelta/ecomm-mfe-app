import React, { useState, useEffect } from 'react';

import { cart, clearCart } from './cart'
import { currency } from 'home/products'

export default function MiniCart(){
    const [items, setItems] = useState(undefined);
    const [showCart, setShowCart] = useState(false);

    useEffect(() =>{
        /* get the cart items + the ?. makes sure that the current cart is not null, by not referencing the 
        cart items that were retrived & null */
        setItems(cart.value?.cartItems);
        return cart.subscribe(c => {
            setItems(c?.cartItems);
        });
    }, []);

    if(!items) return null;

    return ( 
    <>
        <span onClick={() => setShowCart(!showCart)} id="showCart_span">
            <i className="ri-shopping-cart-2-fill text-2xl" id="showcart">
                {items.length}
            </i>
        </span>
        {showCart &&
            <>
                <div 
                    className="absolute p-5 border-4 border-blue-800"
                    style={{
                        width: 300,
                        top: "20rem",
                        // left: -250
                    }}
                >
                    <div 
                        className="grid gap-3 text-sm"
                        style={{
                            gridTemplateColumns: "1fr 3fr 10fr 2fr"
                        }}
                    >
                    {/*Another fragmet is used here to keep all the elements in the same level as this item used
                    Grid layout */} 
                        {items.map(({ id, name, image, quantity, price }) =>(
                            <React.Fragment key={id}>
                                <div>{quantity}</div>
                                <img src={image} alt={name} className="max-h-6" />
                                <div>{name}</div>
                                <div className="text-right">
                                    {currency.format(quantity * price)}
                                </div>
                            </React.Fragment>
                        ))}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            {currency.format(
                                items.reduce((a,v) => a + v.quantity * v.price, 0)
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-grow"> 
                            <button 
                                id="clearcart" 
                                className="bg-white border border-green-8 text-green-8 py-2 px-5 rounded-xl text-black"
                                onClick={clearCart}
                            >Clear Cart</button>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-end"> 
                            <button 
                                id="clearcart" 
                                className="bg-green-900 text-white py-2 px-5 rounded-md text-sm"
                                onClick={clearCart}
                            >Checkout</button>
                        </div>
                    </div>
                </div>
            </>
        }
    </>
    )
}