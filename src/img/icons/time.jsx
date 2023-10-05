import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const TimeIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12} r={9} stroke="#ED7635" strokeWidth={2} />
    <Path
      stroke="#ED7635"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16.5 12h-4.25a.25.25 0 0 1-.25-.25V8.5"
    />
  </Svg>
)
export default TimeIcon;
