import './App.css';
import useFetch from './logic/useFetch'
import SubscriptionFilters from './components/SubscriptionsFilter';
import { useState, useEffect } from 'react';

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types?populate=*')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types?populate=*')
  const [subButtonsStatus, setSubButtonsStatus] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(null)

  useEffect(() => {
    if (subButtonsStatus !== null) {
      let tier = detectTierFilter()
      applySubFilter(tier)
    }
    
  }, [subButtonsStatus])

  function printCategories(categories) {
    let list = categories.map((cat) => {
      return cat.attributes.name
    })
    return list.join(', ')
  }

  if ((!subscriptions.hasOwnProperty('loaded')) && (subButtonsStatus === null)) {
    let newState = generateActivity()
    setSubButtonsStatus(newState)
  }

  if ((!data.hasOwnProperty('loaded')) && (filteredProducts === null)) {
    setFilteredProducts(data)
  }

  function refreshProducts() {
    setFilteredProducts(data)
  }

  function generateActivity() {
    return subscriptions.map((sub) => {
      return { id: sub.id, tier: sub.attributes.tier, active: false }
    })
  }

  function handleSubClick(event) {
    updateButton(+event.target.dataset.id)
  }

  function updateButton(id) {
    setSubButtonsStatus(prevState => {
      return prevState.map((button) => {
          return button.id === id ? { ...button, active: !button.active } : { ...button, active: false }
      })
    })
  }

  function detectTierFilter() {
    let filter = 'none'
    if (subButtonsStatus.some((btn) => btn.active === true)) {
      filter = subButtonsStatus.filter((btn) => btn.active === true)
      filter = filter[0].tier
    }
    return filter
  }

  function applySubFilter(tier) {
    let newState = data
    if (tier !== 'none') {
      newState = newState.filter((item) => item.attributes.subscription_type.data.attributes.tier === tier)
    }
    setFilteredProducts(newState)
  }

  return (
    <div className="App">
      <header className="App-header">
        {filteredProducts === null ?
        <div>Waiting...</div>
        :
        <div>
          {filteredProducts.map((item) => {
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
          <SubscriptionFilters subscriptions={subscriptions} buttons={subButtonsStatus} handleClick={handleSubClick} />
        </div>
        }
      </header>
    </div>
  );
}

export default App;
