import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import { scaleLinear } from "d3-scale"

import getCustomMapStyle from "@/utils/getCustomMapStyle"
import { getProjection } from "@/utils/projections"

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const zoomScale = scaleLinear().domain([1, 45]).range([6, 2])

const MarketMap = ({ market }) => {
  const [opacity, setOpacity] = useState(0)
  const mapRef = useRef()
  const mapInstance = useRef()

  const { bbox, iso, region } = market

  useEffect(() => {
    if (!mapRef.current) return

    mapboxgl.accessToken = mapboxToken

    const { name, center, parallels } = getProjection(iso, region.id)

    const x = bbox[2] - Math.abs(Math.abs(bbox[2]) - Math.abs(bbox[0])) / 2
    const y = bbox[3] - Math.abs(Math.abs(bbox[3]) - Math.abs(bbox[1])) / 2

    const diffX = Math.abs(Math.abs(bbox[2]) - Math.abs(bbox[0]))
    const diffY = Math.abs(Math.abs(bbox[3]) - Math.abs(bbox[1]))
    const diff = Math.max(diffX, diffY)

    const isSm = window.innerWidth < 1000

    const customZooms = {
      "CN": [2.8, 3],
      "CL": [2.8, 3],
      "IN": [3.4, 3.6],
      "RU": [2.2, 2],
      "MX": [3.6, 3.8],
      "US": [2.8, 3],
      "BR": [2.8, 3],
      "ID": [2.8, 3],
      "CD": [4, 4.2],
      "CA": [2.6, 2.8],
    }

    const customCenter = {
      "RU": [isSm ? 74 : 78, isSm ? 66 : 58],
      "US": [isSm ? -96 : -93, 38],
    }

    const zoom = customZooms[iso.toUpperCase()] || [
      zoomScale(diff) - 0.2,
      zoomScale(diff),
    ]

    if (!x || !y) return

    const smCompensation = {
      "US": 0.2,
      "BR": 0.3,
      "CD": 1,
      "CA": 0.2,
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: getCustomMapStyle(),
      zoom: isSm ? zoom[0] - (smCompensation[iso.toUpperCase()] || 0) : zoom[0],
      interactive: true,
      projection: { name, center, parallels },
      center: customCenter[iso.toUpperCase()] || [x, y],
      localFontFamily: "'IBM Plex Sans', 'system-ui', sans-serif",
    })

    mapInstance.current = map

    map.once("load", () => {
      setOpacity(1)
      mapInstance.current.flyTo({
        zoom: isSm
          ? zoom[1] - (smCompensation[iso.toUpperCase()] || 0)
          : zoom[1],
        speed: 0.1,
      })
    })

    return () => {
      map.remove()
    }
  }, [iso, bbox])

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        opacity,
        transition: "opacity 2s",
      }}
    />
  )
}

export default MarketMap
