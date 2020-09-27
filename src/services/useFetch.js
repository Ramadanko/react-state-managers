/**
 * Custom Hook for HTTP calls using fetch
 * Custom hook must start with word use because it's an indication to react
 * a hook is a javascript function with a few extra rules
 */
import { useState, useEffect } from 'react'

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function init() {
            try {
                const response = await fetch(baseUrl + url)
                if (response.ok) {
                    const json = await response.json()
                    setData(json)
                } else {
                    throw response
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        init()
    }, [url])// this is to allow a new API call trigger if we use it somewhere else in the application

    return { data, error, loading }
}