'use script'

export async function fetchJSON (url, options) {
  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json
  } catch (error) {
    console.log('fetchJSON error', error)
    throw error
  }
}
