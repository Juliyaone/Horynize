import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BtnScheduleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      fill="#ED7635"
      d="M2.12 1.29 6 5.17l3.88-3.88a.996.996 0 1 1 1.41 1.41L6.7 7.29a.996.996 0 0 1-1.41 0L.7 2.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0Z"
    />
  </Svg>
)
export default BtnScheduleIcon;
