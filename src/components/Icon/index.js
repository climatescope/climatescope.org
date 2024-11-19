import { Box } from "@chakra-ui/react"

const SvgContainer = ({
  size = "1.5rem",
  children,
  viewBox = "0 0 24 24",
  ...restProps
}) => {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox={viewBox}
      width="24"
      w={size}
      h={size}
      strokeLinecap="square"
      strokeLinejoin="bevel"
      aria-hidden="true"
      {...restProps}
    >
      {children}
    </Box>
  )
}

export const ChevronRightIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M9 18l6-6-6-6" />
    </SvgContainer>
  )
}

export const ChevronLeftIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M15 18l-6-6 6-6" />
    </SvgContainer>
  )
}

export const ChevronDownIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M6 9l6 6 6-6" />
    </SvgContainer>
  )
}

export const ChevronUpIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M18 15l-6-6-6 6" />
    </SvgContainer>
  )
}

export const ArrowLeftIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M19 12H6M12 5l-7 7 7 7" />
    </SvgContainer>
  )
}

export const ArrowRightIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M5 12h13m-6-7l7 7-7 7" />
    </SvgContainer>
  )
}

export const CopyIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <g>
        <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </g>
    </SvgContainer>
  )
}

export const CheckIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M20 6L9 17 4 12" />
    </SvgContainer>
  )
}

export const LinkIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </SvgContainer>
  )
}

export const NavigationIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M3,7L21,7M3,12L21,12M3,17L21,17" />
    </SvgContainer>
  )
}

export const CloseIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M6,6L18,18M6,18L18,6" />
    </SvgContainer>
  )
}

export const ClipboardIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </SvgContainer>
  )
}

export const ExternalLinkIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M18 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V8c0-1.1.9-2 2-2h5m5-3h6v6m-11 5L20.2 3.8" />
    </SvgContainer>
  )
}

export const SearchIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </SvgContainer>
  )
}

export const ShareIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51L15.42 17.49" />
      <path d="M15.41 6.51L8.59 10.49" />
    </SvgContainer>
  )
}

export const MailIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6L12 13 2 6" />
    </SvgContainer>
  )
}

export const FilterIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M4 21L4 14M4 10L4 3M12 21L12 12M12 8L12 3M20 21L20 16M20 12L20 3M1 14L7 14M9 8L15 8M17 16L23 16" />
    </SvgContainer>
  )
}

export const DownloadIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4m-4-6l-5 5-5-5m5 3.8V2.5" />
    </SvgContainer>
  )
}

export const FileIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" />
      <path d="M13 3v6h6" />
    </SvgContainer>
  )
}

export const TwitterIcon = ({
  strokeWidth = 2,
  fill = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer strokeWidth="none" stroke="none" fill={fill} {...restProps}>
      <path d="M24 4.37a9.6 9.6 0 01-2.83.8 5.04 5.04 0 002.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0016.61 2a4.99 4.99 0 00-4.79 6.2A13.87 13.87 0 011.67 2.92 5.12 5.12 0 003.2 9.67a4.82 4.82 0 01-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 01-2.22.08c.63 2.01 2.45 3.47 4.6 3.51a9.72 9.72 0 01-7.3 2.1A13.68 13.68 0 007.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
    </SvgContainer>
  )
}

export const LinkedInIcon = ({
  strokeWidth = 2,
  fill = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer strokeWidth="none" stroke="none" fill={fill} {...restProps}>
      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54A3.6 3.6 0 0116.17 9c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
    </SvgContainer>
  )
}

export const LightbulbIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      {...restProps}
    >
      <path d="M1 12L3 12" />
      <path d="M4.222 4.222L5.636 5.636" />
      <path d="M12 1L12 3" />
      <path d="M19.778 4.222L18.364 5.636" />
      <path d="M23 12L21 12" />
      <path d="M18 12a6 6 0 10-12 0 5.996 5.996 0 004 5.651V22h4v-4.349c2.329-.824 4-3.04 4-5.651z" />
    </SvgContainer>
  )
}

export const RankingIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      viewBox="0 0 40 40"
      {...restProps}
    >
      <path
        stroke="#7654A3"
        d="m2 36 9-4 9 4 9-13 9 15M2 7l9-5 9 4 5.5 4M38 14h-7l-1.5-1"
      />
      <path stroke="#00AEFF" d="m2 28 9-14 9 8 9-12.5L38 2" />
    </SvgContainer>
  )
}

export const HighlightsIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      viewBox="0 0 40 40"
      {...restProps}
    >
      <path d="M2 5H30" stroke="#7654A3" />
      <path d="M2 15H13" stroke="#7654A3" />
      <path d="M2 25H13" stroke="#7654A3" />
      <path d="M2 35H25" stroke="#7654A3" />
      <circle cx="25" cy="20" r="9" stroke="#00AEFF" />
      <path d="M38 33L31.5 26.5" stroke="#00AEFF" />
    </SvgContainer>
  )
}

export const FactbookIcon = ({
  strokeWidth = 2,
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill="none"
      viewBox="0 0 40 40"
      {...restProps}
    >
      <path d="M20 17.5V37.5" stroke="#00AEFF" />
      <path d="M26.25 31.25L20 37.5L13.75 31.25" stroke="#00AEFF" />
      <path
        d="M24 26H32C35.36 25.64 38 22.88 38 19.4C38 15.92 35.36 13.16 32 12.8C31.4 6.8 26.24 2 20 2C14.6 2 10.04 5.6 8.48 10.52C4.88 11.12 2 14.36 2 18.2C2 22.28 5.12 25.64 9.2 26H16"
        stroke="#7654A3"
      />
    </SvgContainer>
  )
}

export const EmailIcon = ({
  strokeWidth = 2,
  fill = "none",
  stroke = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      {...restProps}
    >
      <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </SvgContainer>
  )
}

export const FacebookIcon = ({
  strokeWidth = 2,
  fill = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer strokeWidth="none" stroke="none" fill={fill} {...restProps}>
      <path d="M22.5 0c.83 0 1.5.67 1.5 1.5v21c0 .83-.67 1.5-1.5 1.5h-6v-9h3l.75-3.75H16.5v-1.5c0-1.5.75-2.25 2.25-2.25h1.5V3.75h-3c-2.76 0-4.5 2.16-4.5 5.25v2.25h-3V15h3v9H1.5A1.5 1.5 0 010 22.5v-21C0 .67.67 0 1.5 0h21z" />
    </SvgContainer>
  )
}

export const InstagramIcon = ({
  strokeWidth = 2,
  fill = "currentcolor",
  ...restProps
}) => {
  return (
    <SvgContainer strokeWidth="none" stroke="none" fill={fill} {...restProps}>
      <path d="M16.15 2.003a5.748 5.748 0 014.231 1.65 5.782 5.782 0 011.616 4.198v8.298c0 1.732-.566 3.224-1.65 4.273a5.948 5.948 0 01-4.231 1.575h-8.23a5.881 5.881 0 01-4.191-1.575 5.799 5.799 0 01-1.691-4.307V7.851c0-3.515 2.332-5.848 5.848-5.848h8.297zm.04 1.858H7.886c-1.208 0-2.25.358-2.94 1.041a4.015 4.015 0 00-1.083 2.95v8.263c0 1.25.358 2.25 1.082 2.983a4.165 4.165 0 002.941 1.041h8.23a4.165 4.165 0 002.941-1.041 3.938 3.938 0 001.167-2.95V7.852a4.165 4.165 0 00-1.083-2.907 4.015 4.015 0 00-2.95-1.083zM12 6.801c2.825 0 5.165 2.333 5.165 5.166a5.165 5.165 0 11-5.164-5.165zm0 1.85a3.324 3.324 0 00-3.307 3.307 3.324 3.324 0 003.308 3.308 3.323 3.323 0 003.307-3.308A3.324 3.324 0 0012 8.651zm5.365-3.14a1.166 1.166 0 110 2.332 1.166 1.166 0 010-2.332z" />
    </SvgContainer>
  )
}
