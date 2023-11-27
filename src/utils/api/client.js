import useSWRImmutable from "swr/immutable"
import { csvParse } from "d3-dsv"

export const jsonFetcher =
  (cb) =>
  (...args) =>
    fetch(...args)
      .then((res) => res.json())
      .then((data) => (cb ? cb(data) : data))

export const csvFetcher =
  (cb) =>
  (...args) =>
    fetch(...args)
      .then((res) => res.text())
      .then((data) => (cb ? cb(csvParse(data)) : csvParse(data)))

export const fetchers = {
  json: jsonFetcher,
  csv: csvFetcher,
}

export const useData = (url, options = {}, cb) => {
  const format = url.split(".").slice(-1)[0]
  const fetcher = fetchers[format]
  return useSWRImmutable(url, fetcher(cb), options)
}

export const useClientData = useData
