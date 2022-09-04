import './App.css';
import useFetch from './logic/useFetch'
import SubTiersModal from './components/SubTiersModal';
import ProductCard from './components/ProductCard';
import { ProductsGrid } from './components/StyledComponents';
import { useState, useEffect } from 'react';
import CategoriesFilters from './components/CategoriesFilter';

function App() {
  const data = useFetch('http://localhost:1337/api/products?populate=*')
  const categories = useFetch('http://localhost:1337/api/product-types?populate=*')
  const subscriptions = useFetch('http://localhost:1337/api/subscription-types?populate=*')
  const [subFilters, setSubFilters] = useState([])
  const [catFilter, setCatFilter] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (filteredProducts !== null) {
      applyFilters()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subFilters, catFilter])

  function toggleModal() {
    setVisible(!visible)
  }

  if ((!data.hasOwnProperty('loaded')) && (filteredProducts === null)) {
    setFilteredProducts(data)
  }

  function updateSubButtons(filter) {
    setSubFilters(filter)
  }

  function updateCatButtons(filter) {
    setCatFilter(filter)
  }

  function applyFilters() {
    let newState = data
    if (subFilters.length > 0) {
      newState = newState.filter((item) => subFilters.includes(item.attributes.subscription_type.data.attributes.tier))
    }
    if (catFilter !== 'all') {
      newState = newState.filter((item) => item.attributes.product_types.data.some((single) => single.attributes.name === catFilter))
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
      <CategoriesFilters categories={categories} update={updateCatButtons}/>
      }
      {filteredProducts === null ?
      null
      :
      <div className='w-100'>
        {filteredProducts.length === 0 ?
        <div>Nessun prodotto rispecchia le specifiche.</div>
        :
        <ProductsGrid>
          {filteredProducts.map((item) => {
            return <ProductCard key={item.id} product={item} />
          })}
        </ProductsGrid>
        }
      </div>
      }
      {subscriptions.loaded === false ?
      null
      :
      <SubTiersModal subscriptions={subscriptions} update={updateSubButtons} visible={visible} toggleModal={toggleModal} />
      }
    </div>
  );
}

export default App;
