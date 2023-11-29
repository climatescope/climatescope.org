export const Icon = ({
  size = "24",
  viewBox = "0 0 24 24",
  strokeWidth = 2,
  stroke = "currentcolor",
  fill = "none",
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="bevel"
      aria-hidden="true"
      {...restProps}
    />
  )
}

export const ReportIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M2 5H18V23H2z" />
      <path d="M5 1L22 1 22 21" />
      <path d="M6 10L14 10" />
      <path d="M6 14L14 14" />
      <path d="M6 18L10 18" />
    </Icon>
  )
}

export const ChartIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M1 21L23 21" />
      <path d="M2 8H6V17H2z" />
      <path d="M10 3H14V17H10z" />
      <path d="M18 12H22V17H18z" />
    </Icon>
  )
}

export const StarIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
    </Icon>
  )
}

export const CheckIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M20 6L9 17 4 12" />
    </Icon>
  )
}

export const QuestionIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="16.5" r="0.5" />
    </Icon>
  )
}

export const ExternalIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M18 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V8c0-1.1.9-2 2-2h5m5-3h6v6m-11 5l5.1-5.1 5.1-5.1" />
    </Icon>
  )
}

export const CloseIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  )
}

export const MenuIcon = (props) => {
  return (
    <Icon {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  )
}

export const DownloadIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
    </Icon>
  )
}

export const ViewIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </Icon>
  )
}

export const ArrowRight = (props) => {
  return (
    <Icon {...props}>
      <path d="M5 12h13M12 5l7 7-7 7" />
    </Icon>
  )
}

export const ArrowLeft = (props) => {
  return (
    <Icon {...props}>
      <path d="M19 12H6M12 5l-7 7 7 7" />
    </Icon>
  )
}

export const ChevronRight = (props) => {
  return (
    <Icon {...props}>
      <path d="M9 18l6-6-6-6" />
    </Icon>
  )
}

export const ChevronLeft = (props) => {
  return (
    <Icon {...props}>
      <path d="M15 18l-6-6 6-6" />
    </Icon>
  )
}

export const ChevronUp = (props) => {
  return (
    <Icon {...props}>
      <path d="M18 15l-6-6-6 6" />
    </Icon>
  )
}

export const ChevronDown = (props) => {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  )
}

export const SliderIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M8.5 5l-7 7 7 7M15.5 19l7-7-7-7" />
    </Icon>
  )
}

export const ShareIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51L15.42 17.49" />
        <path d="M15.41 6.51L8.59 10.49" />
      </g>
    </Icon>
  )
}

export const ResetIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M2.5 2v6h6m-5.84 7.57a10 10 0 10.57-8.38" />
    </Icon>
  )
}

export const AddIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path d="M12 5L12 19" />
        <path d="M5 12L19 12" />
      </g>
    </Icon>
  )
}

export const PrintIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path d="M6 9L6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
        <path d="M6 14H18V22H6z" />
      </g>
    </Icon>
  )
}

export const MoreIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </g>
    </Icon>
  )
}

export const MapIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path d="M9 2v18M15 4v18" />
        <path d="M1 4l8-2 6 2 8-2v18l-8 2-6-2-8 2V4z" />
      </g>
    </Icon>
  )
}

export const TableIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M3 3h18v18H3zm18 6H3m18 6H3m9-12v18" />
    </Icon>
  )
}

export const CompareIcon = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path d="M2 12L10 12" />
        <path d="M6 16L2 12 6 8" />
        <path d="M22 12L14 12" />
        <path d="M18 16L22 12 18 8" />
      </g>
    </Icon>
  )
}

export const GreenIdeaIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M12 20V4.5" />
      <path d="M9 20h6" />
      <path d="M16.5 6H16a4 4 0 00-4 4v1h.5a4 4 0 004-4V6zM7.5 10.5a4 4 0 004 4h.5v-1a4 4 0 00-4-4h-.5v1z" />
      <path d="M20.5 9.5a8.502 8.502 0 00-9.476-8.446c-3.798.423-6.906 3.431-7.437 7.217-.584 4.155 1.845 7.825 5.413 9.174V20a3 3 0 003 3h0a3 3 0 003-3v-2.555c3.212-1.214 5.5-4.308 5.5-7.945z" />
    </Icon>
  )
}

export const InvestmentIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M18.5 15l2.183-1.25a1.527 1.527 0 012.078.56l.018.03a1.568 1.568 0 01-.35 2l-4.058 3.35c-.243.201-.53.341-.838.409l-7.7 1.711a2 2 0 01-1.543-.288l-4.786-3.186A2 2 0 002.394 18H1v-6l3.55-.395c.625-.069 1.257.01 1.846.231l2.733 1.024c.247.093.503.161.764.204l5.111.829A1.611 1.611 0 0116.5 15.5v0a1.612 1.612 0 01-1.496 1.607L9.5 17.5M14.5 10.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
      <path d="M14.5 4l-2 2 2 2 2-2-2-2z" />
    </Icon>
  )
}

export const PolicyIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M3 23V1h18v22H3z" />
      <path d="M12 4L7 6.5v1h10v-1L12 4zM8.5 13v-3M12 13v-3M15.5 13v-3M7 13h10M7 16h10M7 19h5" />
    </Icon>
  )
}

export const ProgressIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M14 14h-4v9h4v-9zM5 19H1v4h4v-4zM23 9h-4v14h4V9z" />
      <path d="M3 9l5-5 4 4 7-7" />
      <path d="M14.5 1H19v4.5" />
    </Icon>
  )
}

export const MarketsIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M6.411 21.49c.615-.454 1.087-1.61 1.087-1.61s.532-.37.698-.84c.166-.471.01-1.11.01-1.11s.47-1.383.249-1.77c-.222-.389-1.164-.638-1.164-.638s-.387-.72-1.19-.859c-.527-.055-1.054-.415-1.054-1.163s.748-1.966.748-1.966.776-.38.887-.657c.11-.277.148-.922.148-.922s.738-1.302.322-2.05c-.132-.239-.748-.416-.748-.416l-.862-1.294M19.695 19.489c-.941-.451-2.587-.828-2.587-.828s-1.203-1.339-1.992-1.228c-.79.111-1.593.997-1.593.997s.056 1.635-.194 1.718c-.249.083-.914-.36-1.329-.028-.415.332-.176 1.27-.176 1.27s-.904.282-1.015.586c-.11.305.33.983.413 1.244" />
      <path d="M12.21 3.755c-.07-.001-.14-.005-.21-.005-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75a9.74 9.74 0 00-.47-3" />
      <path d="M21 5.133C21 7.838 16.5 12 16.5 12S12 7.838 12 5.133C12 2.36 14.325.75 16.5.75S21 2.36 21 5.133z" />
      <path d="M16.5 6.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </Icon>
  )
}

export const BuildingsIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M18 6L18 1 6 1 6 9" />
      <path d="M10 23L14 23" />
      <path d="M1 12H10V23H1z" />
      <path d="M14 9H23V23H14z" />
      <path d="M18 13L19 13" />
      <path d="M18 16L19 16" />
      <path d="M18 19L19 19" />
      <path d="M5 19L6 19" />
      <path d="M5 16L6 16" />
    </Icon>
  )
}

export const TransportIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M17.5 17.5L20 23M4 23l2.5-5.5M5.136 20.5h13.727" />
      <path d="M1 6v3M23 6v3M18.5 17.5h-13a2 2 0 01-2-2V3a2 2 0 012-2h13a2 2 0 012 2v12.5a2 2 0 01-2 2z" />
      <path d="M16.5 10h-9l-1-6h11l-1 6zM7.75 15a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM16.25 15a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
    </Icon>
  )
}

export const GlobalRankIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M12 9L12 15" />
      <path d="M3 15L3 12 21 12 21 15" />
      <circle cx="12" cy="3" r="2" />
      <circle cx="3" cy="21" r="2" />
      <circle cx="12" cy="21" r="2" />
      <circle cx="21" cy="21" r="2" />
    </Icon>
  )
}

export const TwitterIcon = (props) => {
  return (
    <Icon {...props} fill="currentcolor" stroke="none">
      <path d="M24 4.37a9.6 9.6 0 01-2.83.8 5.04 5.04 0 002.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0016.61 2a4.99 4.99 0 00-4.79 6.2A13.87 13.87 0 011.67 2.92 5.12 5.12 0 003.2 9.67a4.82 4.82 0 01-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 01-2.22.08c.63 2.01 2.45 3.47 4.6 3.51a9.72 9.72 0 01-7.3 2.1A13.68 13.68 0 007.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
    </Icon>
  )
}

export const FacebookIcon = (props) => {
  return (
    <Icon {...props} fill="currentcolor" stroke="none">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
    </Icon>
  )
}

export const LinkedinIcon = (props) => {
  return (
    <Icon {...props} fill="currentcolor" stroke="none">
      <path d="M20 0a4 4 0 014 4v16a4 4 0 01-4 4H4a4 4 0 01-4-4V4a4 4 0 014-4h16zM8.95 9.4H6.16v8.1h2.8V9.4zm6.84-.19c-1.32 0-2 .63-2.38 1.16l-.13.18V9.4h-2.79l.01.49v7.61h2.78v-4.52a1.52 1.52 0 011.52-1.64c.96 0 1.37.66 1.41 1.66v4.5H19v-4.64c0-2.49-1.37-3.65-3.2-3.65zM7.58 5.5C6.62 5.5 6 6.1 6 6.9c0 .73.54 1.32 1.38 1.4h.18c.97 0 1.57-.62 1.57-1.4-.01-.8-.6-1.4-1.55-1.4z" />
    </Icon>
  )
}

export const EnvelopeIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6L12 13 2 6" />
    </Icon>
  )
}

export const LicenseIcon = (props) => {
  return (
    <Icon {...props} fill="currentcolor" stroke="none">
      <path d="M8.714 10a1.8 1.8 0 01.833.177l.892.453.9-1.784-.891-.452A3.806 3.806 0 008.714 8C6.423 8 5 9.532 5 12s1.423 4 3.714 4a3.806 3.806 0 001.739-.394l.891-.452-.9-1.784-.892.453a1.8 1.8 0 01-.838.177C8.2 14 7 14 7 12s1.2-2 1.714-2zM15.714 10a1.8 1.8 0 01.833.177l.892.453.905-1.784-.891-.452A3.806 3.806 0 0015.714 8C13.423 8 12 9.532 12 12s1.423 4 3.714 4a3.806 3.806 0 001.739-.394l.891-.452-.905-1.784-.892.453a1.8 1.8 0 01-.833.177C15.2 14 14 14 14 12s1.2-2 1.714-2z" />
      <path d="M12 24a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0012 2z" />
    </Icon>
  )
}

export const ContactIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M22 2L7 14 7 21 10.6 16.7" />
      <path d="M2 10L22 2 18 22z" />
    </Icon>
  )
}

export const MethodologyIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M4 7L10 7.001" />
      <path d="M4 16.999L10 17.001" />
      <path d="M14 18.999L20 19" />
      <path d="M14 14.998L20 14.999" />
      <path d="M7.001 14L6.999 20" />
      <path d="M15 5L19 9" />
      <path d="M19 5L15 9" />
    </Icon>
  )
}

export const CancelIcon = (props) => {
  return (
    <Icon {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </Icon>
  )
}
