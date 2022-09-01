import './App.css';
// import { useState, useEffect } from 'react'
import useFetch from './logic/useProducts'

function App() {
  const { products } = useFetch('http://localhost:1337/api/products?populate=*')

  return (
    <div className="App">
      <header className="App-header">
        {products.loaded === false ?
        <div>Waiting...</div>
        :
        <div>
          {products.map((item) => {
            console.log(products)
            return <div key={item.id}>{`${item.attributes.brand} ~ ${item.attributes.product_types} ~ ${item.attributes.subscription_type}`}</div>
          })}
        </div>
        }
      </header>
    </div>
  );
}

export default App;
