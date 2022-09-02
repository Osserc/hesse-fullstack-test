import './App.css';
import useFetch from './logic/useFetch'
import SubscriptionFilters from './components/SubscriptionsFilter';

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types?populate=*')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types?populate=*')

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
          <SubscriptionFilters subscriptions={subscriptions} />
        </div>
        }
      </header>
    </div>
  );
}

export default App;
