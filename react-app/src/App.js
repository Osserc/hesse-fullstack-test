import './App.css';
import useFetch from './logic/useFetch'
import SubscriptionFilters from './components/SubscriptionsFilter';
import SubTiersModal from './components/SubTiersModal';
import ProductCard from './components/ProductCard';
import { Button } from './components/StyledComponents';
import { useState, useEffect } from 'react';
import CategoriesFilters from './components/CategoriesFilter';

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types?populate=*')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types?populate=*')
  const [subButtonsStatus, setSubButtonsStatus] = useState(null)
  const [catButtonsStatus, setCatButtonsStatus] = useState(null)
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if ((subButtonsStatus !== null) && (catButtonsStatus !== null)) {
      let tier = detectSubFilter()
      let cat = detectCatFilter()
      applyFilters(tier, cat)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subButtonsStatus, catButtonsStatus])

  function toggleModal() {
    setVisible(!visible)
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
      return { id: cat.id, type: cat.attributes.name, active: false }
    })
  }

  function handleClick(event) {
    if (event.target.dataset.filter === 'Subscriptions') {
      updateSubButton(+event.target.dataset.id)
    } else {
      updateCatButton(+event.target.dataset.id)
    }
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

  function detectSubFilter() {
    let filter = 'all'
    if (subButtonsStatus.some((btn) => btn.active === true)) {
      filter = subButtonsStatus.filter((btn) => btn.active === true)
      filter = filter[0].tier
    }
    return filter
  }

  function detectCatFilter() {
    let filter = 'all'
    if (catButtonsStatus.some((btn) => btn.active === true)) {
      filter = catButtonsStatus.filter((btn) => btn.active === true)
      filter = filter[0].type
    }
    return filter
  }

  function applyFilters(tier, cat) {
    let newState = data
    if (tier !== 'all') {
      newState = newState.filter((item) => item.attributes.subscription_type.data.attributes.tier === tier)
    }
    if (cat !== 'all') {
      newState = newState.filter((item) => item.attributes.product_types.data.some((single) => single.attributes.name === cat))
    }
    setFilteredProducts(newState)
  }

  return (
    <div className={`App ${visible ? 'visible' : ''}`}>
      {subscriptions.loaded === false ?
      null
      :
      <div className='w-100'>
        <div className='text-right p-15 t-bold' onClick={toggleModal}>Filtra</div>
      </div>
      }
      {categories.loaded === false ?
      null
      :
      <CategoriesFilters categories={categories} buttons={catButtonsStatus} handleClick={handleClick}/>
      }
      {filteredProducts === null ?
      null
      :
      <div className='w-100'>
        {filteredProducts.length === 0 ?
        <div>Nessun prodotto rispecchia le specifiche.</div>
        :
        <div className='products-grid w-100 justify-center'>
          {filteredProducts.map((item) => {
            return <ProductCard key={item.id} product={item} />
          })}
        </div>}
      </div>
      }
      {subscriptions.loaded === false ?
      null
      :
      <SubTiersModal subscriptions={subscriptions} buttons={subButtonsStatus} handleClick={handleClick} visible={visible} toggleModal={toggleModal} />
      }
    </div>
  );
}

export default App;
