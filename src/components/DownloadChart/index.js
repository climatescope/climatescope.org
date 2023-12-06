import { Button } from "@chakra-ui/button"
import { useTheme } from "@chakra-ui/system"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import { Tooltip } from "@chakra-ui/tooltip"

import { DownloadIcon } from "@components/Icon"

const getDimensions = ($el) => {
  const [width, height] = $el.getAttribute("viewBox")?.split(" ")?.slice(2)
  return [parseInt(width) || 0, parseInt(height) || 0]
}

export default function DownloadChart({
  chartRef,
  chartName = "",
  title = "",
  subtitle = "",
  padding = { top: 48, bottom: 12, left: 0, right: 90 },
  legend = [],
  legendFontSize = 8,
  legendColorOpacity = 1,
}) {
  const { colors } = useTheme()

  const handlePNGDownload = async () => {
    if (!chartRef.current) return
    const { saveSvgAsPng } = await import("save-svg-as-png")

    const $elClone = chartRef.current.cloneNode(true)
    const [width, height] = getDimensions($elClone)

    const $g = document.createElementNS("http://www.w3.org/2000/svg", "g")
    $g.setAttribute("transform", `translate(${padding.left} ${padding.top})`)

    const w = width + padding.left + padding.right
    const h = height + padding.top + padding.bottom

    const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    $svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
    $svg.style.fontFamily = `"IBM Plex Sans", system-ui, sans-serif`
    $svg.style.background = "#FFFFFF"
    $g.innerHTML = $elClone.innerHTML
    $svg.appendChild($g)

    if (title) {
      const $title = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      )
      $title.innerHTML = title
      $title.setAttribute("alignment-baseline", "hanging")
      $title.setAttribute("x", 10)
      $title.setAttribute("y", 10)
      $title.style.fontSize = padding.top / 3
      $title.style.fontWeight = 600
      $title.style.fill = colors.gray[800]
      $svg.appendChild($title)
    }

    if (subtitle) {
      const $subtitle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      )
      $subtitle.innerHTML = subtitle
      $subtitle.setAttribute("alignment-baseline", "hanging")
      $subtitle.setAttribute("x", 10)
      $subtitle.setAttribute("y", 10 + padding.top / 3 + 4)
      $subtitle.style.fontSize = padding.top / 4
      $subtitle.style.fill = colors.gray[500]
      $subtitle.style.fontWeight = 500
      $svg.appendChild($subtitle)
    }

    const $logo = document.querySelector(".climatescope-logo")

    if (!$logo) return

    const $logoG = document.createElementNS("http://www.w3.org/2000/svg", "g")
    $logoG.setAttribute(
      "transform",
      `translate(10 ${h - padding.bottom - 4}) scale(${
        ((100 / 50) * padding.bottom) / 100
      })`
    )
    $logoG.innerHTML = $logo.innerHTML
    $svg.appendChild($logoG)

    if (legend.length) {
      const $legend = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      )
      $legend.setAttribute(
        "transform",
        `translate(${width} ${padding.top + 8})`
      )
      legend.forEach((item, i) => {
        const $legendItem = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        )
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        )
        const textNode = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        )
        $legendItem.setAttribute(
          "transform",
          `translate(4 ${i * (legendFontSize + 6)})`
        )
        circle.setAttribute("r", legendFontSize / 2)
        circle.setAttribute("cy", 0.5)
        circle.setAttribute("fill", item.color)
        circle.setAttribute("fill-opacity", legendColorOpacity)
        textNode.setAttribute("x", legendFontSize)
        textNode.setAttribute("alignment-baseline", "central")
        textNode.style.fontSize = legendFontSize
        textNode.style.fontWeight = 600
        textNode.style.fill = colors.gray[800]
        textNode.innerHTML = item.label
        $legendItem.appendChild(circle)
        $legendItem.appendChild(textNode)
        $legend.appendChild($legendItem)
      })
      $svg.appendChild($legend)
    }

    const options = {
      scale: 2,
      fonts: [
        {
          url: "https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2",
          format: "application/font-woff2",
          text: `@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 400; src: url(https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }`,
        },
        {
          url: "https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9AIFsdP3pBms.woff2",
          format: "application/font-woff2",
          text: `@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 500; src: url(https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9AIFsdP3pBms.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }`,
        },
        {
          url: "https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2",
          format: "application/font-woff2",
          text: `@font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 600; src: url(https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2) format('woff2'); unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }`,
        },
      ],
    }
    saveSvgAsPng($svg, `${chartName || title || "chart"}.png`, options)
  }

  const handleClick = () => {
    handlePNGDownload()
  }

  return (
    <Tooltip label="Download chart" hasArrow openDelay={500} placement="top">
      <Button
        onClick={handleClick}
        variant="subtle"
        colorScheme="gray"
        borderRadius="full"
        p={0}
      >
        <VisuallyHidden>{"Download chart"}</VisuallyHidden>
        <DownloadIcon />
      </Button>
    </Tooltip>
  )
}
