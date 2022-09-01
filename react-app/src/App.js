import './App.css';
import { Button } from './components/styledComponents'
import useFetch from './logic/useFetch'

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types')

  function printCategories(categories) {
    let list = categories.map((cat) => {
      return cat.attributes.name
    })
    return list.join(', ')
  }

  return (
    <div className="App">
      <header className="App-header">
        {data.loaded === false ?
        <div>Waiting...</div>
        :
        <div>
          {data.map((item) => {
            return <div key={item.id}>{`${item.attributes.brand} ~ ${printCategories(item.attributes.product_types.data)} ~ ${item.attributes.subscription_type.data.attributes.tier}`}</div>
          })}
        </div>
        }
        {categories.loaded === false ?
        <div>Waiting...</div>
        :
        <div>
          {categories.map((cat) => {
            return <div key={cat.id}>{`${cat.attributes.name}`}</div>
          })}
        </div>
        }
        {subscriptions.loaded === false ?
        <div>Waiting...</div>
        :
        <div>
          {subscriptions.map((sub) => {
            return <div key={sub.id}>{`${sub.attributes.tier} ~ ${sub.attributes.subscription_price} ~ ${sub.attributes.retail_price}`}</div>
          })}
        </div>
        }
      </header>
    </div>
  );
}

export default App;
