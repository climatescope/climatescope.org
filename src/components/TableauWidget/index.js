import { Box } from "@chakra-ui/react"

const TableauWidget = ({ src, height }) => {
  return (
    <Box>
      <iframe src={src} width="1000px" height={height} />
    </Box>
  )
}

export default TableauWidget
