import { useState, useEffect } from 'react'

function useFetch(url) {
    const [products, setProducts] = useState({ loaded: false })

    useEffect(() => {
        retrieveData(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function retrieveData(url) {
        try {
        const data = await fetch(url)
        const content = await data.json()
        setProducts(content.data)
        } catch(error) {
        throw new Error('Error: ' + error)
        }
    }

    return {
        products
    }
}

export default useFetch