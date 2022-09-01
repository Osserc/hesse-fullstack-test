import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState({ loaded: false })

  useEffect(() => {
    retrieveData()
  }, [])

  async function retrieveData() {
    try {
      const data = await fetch('http://localhost:1337/api/products?populate=*')
      const content = await data.json()
      setProducts({ loaded: true, content: content.data })
    } catch(error) {
      throw new Error('Error: ' + error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {products.loaded === false ?
        <div>Waiting...</div>
        :
        <div>
          {products.content.map((item) => {
            return <div key={item.id}>{`${item.attributes.brand} ~ ${item.attributes.product_types} ~ ${item.attributes.subscription_type}`}</div>
          })}
        </div>
        }
      </header>
    </div>
  );
}

export default App;
