import React from 'react'
import useStorePizza from "./../../Store/pizza.zustand";

const BuySelector = () => {
    const storePizza = useStorePizza();

    return (
        <section className='flex flex-col gap-2'>
            <input type="text" />
            <input type="text" />
            <input type="text" />
        </section>)
}

export default BuySelector;