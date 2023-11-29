import { useEffect } from "react"

const TableauWidget = () => {
  useEffect(() => {
    if (typeof window === "undefined") return
    var divElement = document.getElementById("viz1701216492462")
    var vizElement = divElement.getElementsByTagName("object")[0]
    vizElement.style.width = "100%"
    vizElement.style.height = "1027px"
    var scriptElement = document.createElement("script")
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js"
    vizElement.parentNode.insertBefore(scriptElement, vizElement)
  }, [])

  return (
    <div
      className="tableauPlaceholder"
      id="viz1701216492462"
      style={{ position: "relative", width: "100%" }}
    >
      <object className="tableauViz" style={{ display: "none" }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param
          name="name"
          value="EnergyCapacityGenerationinEmergingMarkets_17011920152870&#47;CapacityGeneration"
        />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-GB" />
      </object>
    </div>
  )
}

export default TableauWidget
