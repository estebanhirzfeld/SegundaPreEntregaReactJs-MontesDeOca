import {useState, useEffect} from 'react'
import ItemsList from "../ItemsList/ItemsList"
import "./ItemListContainer.css"
import Spinner from '../Spinner/Spinner'

import { useParams } from 'react-router-dom'

const ItemListContainer = ({greeting}) => {

  const [products,setProducts] = useState([])

  const {categoryId} = useParams();

  const [loading,setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/productos.json')
        const data = await response.json()
        
        const filteredProducts = categoryId ? data.filter((p) => p.category === categoryId) : data;
        setProducts(filteredProducts)
  
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [categoryId]) 

  console.log(products)

  return (
    <div className="container">
      <h1>{greeting}</h1>
      {loading ? <Spinner/> : <ItemsList products={products}/>}
    </div>
  )
}

export default ItemListContainer