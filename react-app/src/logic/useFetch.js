import { useState, useEffect } from 'react'

function useFetch(url) {
    const [data, setData] = useState({ loaded: false })

    useEffect(() => {
        retrieveData(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function retrieveData(url) {
        try {
        const rawData = await fetch(url)
        const content = await rawData.json()
        setData(content.data)
        } catch(error) {
        throw new Error('Error: ' + error)
        }
    }

    return data
}

export default useFetch