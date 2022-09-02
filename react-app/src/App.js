import './App.css';
import useFetch from './logic/useFetch'
import SubscriptionFilters from './components/SubscriptionsFilter';
import CategoriesFilters from './components/CategoriesFilter';
import { useState, useEffect } from 'react';

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types?populate=*')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types?populate=*')
  const [subButtonsStatus, setSubButtonsStatus] = useState(null)
  const [catButtonsStatus, setCatButtonsStatus] = useState(null)
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
    let newState = generateSubStatus()
    setSubButtonsStatus(newState)
  }

  if ((!categories.hasOwnProperty('loaded')) && (catButtonsStatus === null)) {
    let newState = generateCatStatus()
    setCatButtonsStatus(newState)
  }

  if ((!data.hasOwnProperty('loaded')) && (filteredProducts === null)) {
    setFilteredProducts(data)
  }

  function generateSubStatus() {
    return subscriptions.map((sub) => {
      return { id: sub.id, tier: sub.attributes.tier, active: false }
    })
  }

  function generateCatStatus() {
    return categories.map((cat) => {
      return { id: cat.id, tier: cat.attributes.name, active: false }
    })
  }

  function handleSubClick(event) {
    updateSubButton(+event.target.dataset.id)
  }

  function handleCatClick(event) {
    updateCatButton(+event.target.dataset.id)
  }

  function updateSubButton(id) {
    setSubButtonsStatus(prevState => {
      return prevState.map((button) => {
        return button.id === id ? { ...button, active: !button.active } : { ...button, active: false }
      })
    })
  }

  function updateCatButton(id) {
    setCatButtonsStatus(prevState => {
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
          <CategoriesFilters categories={categories} buttons={catButtonsStatus} handleClick={handleCatClick} />
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
