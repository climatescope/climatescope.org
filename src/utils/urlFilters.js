class URLFilters {
  append(name, value) {
    if (typeof window === "undefined") return ""
    const { pathname, search: searchParams } = window.location
    const params = new URLSearchParams(searchParams?.slice(1).toString())
    params.append(name, value)
    return pathname + "?" + params.toString()
  }
  remove(name, value) {
    if (typeof window === "undefined") return ""
    const { pathname, search: searchParams } = window.location
    const params = new URLSearchParams(searchParams?.slice(1).toString())
    params.delete(name, value)
    const paramStr = params.toString()
    if (!paramStr) return pathname
    return pathname + "?" + paramStr
  }
  update(name, value) {
    if (typeof window === "undefined") return ""
    const { pathname, search: searchParams } = window.location
    const params = new URLSearchParams(searchParams?.slice(1).toString())
    params.set(name, value)
    if (!value) params.delete(name, value)
    const paramStr = params.toString()
    if (!paramStr) return pathname
    return pathname + "?" + paramStr
  }
}

export const urlFilters = new URLFilters()
