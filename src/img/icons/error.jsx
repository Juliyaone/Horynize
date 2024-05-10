import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const errorComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <Circle cx={48} cy={48} r={36} stroke="#ED7635" strokeWidth={6} />
    <Path stroke="#ED7635" strokeWidth={6} d="m36 59.998 24-24M60 60 36 36" />
  </Svg>
)
export default errorComponent
