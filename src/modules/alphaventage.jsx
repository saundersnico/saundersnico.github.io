import { useEffect, useState } from "react";

const API_KEY = '7E6IT8Z2FL00HT7Y';

const AlphaVentage = ()=>{
    const [price, getPrice] = useState();
    const CoffePrice = async()=>{
        let response = await fetch(`https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=${API_KEY}`)
        .then((response) => response.json());
        getPrice(response.data[0].value);
        console.log(response);
    }
    useEffect(()=>{
       CoffePrice();
    }, []);
    const coffeUsdPriceLb = price/100; 
    const coffeUsdPriceGr = 222/453.6/100; 
    return(
        <>
        <h1>Cafe:</h1>
        <p>Precio: ${(coffeUsdPriceLb)} por libra</p>
        <p>Precio: ${(coffeUsdPriceGr)} por gramo</p>
        </>
    );
}
export default AlphaVentage;