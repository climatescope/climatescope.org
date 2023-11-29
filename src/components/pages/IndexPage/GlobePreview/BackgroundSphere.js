import { memo } from "react"
import { useTheme } from "@chakra-ui/system"

const BackgroundSphere = () => {
  const { colors } = useTheme()
  return (
    <>
      <defs>
        <radialGradient id="RadialGradient1">
          <stop offset="30%" stopColor={colors.blackAlpha[800]} />
          <stop offset="100%" stopColor={colors.brand[800]} />
        </radialGradient>
        <radialGradient id="RadialGradient2">
          <stop offset="0%" stopColor={colors.blackAlpha[900]} />
          <stop offset="100%" stopColor={colors.brand[900]} />
        </radialGradient>
      </defs>

      <circle
        fill="url(#RadialGradient2)"
        cx={300}
        cy={300}
        r={300}
        fillOpacity={0.5}
      />
      <circle fill={colors.brand[900]} cx={300} cy={300} r={280} />
      <circle
        fill="url(#RadialGradient1)"
        cx={300}
        cy={300}
        r={280}
        fillOpacity={0.3}
      />
    </>
  )
}

export default memo(BackgroundSphere)
