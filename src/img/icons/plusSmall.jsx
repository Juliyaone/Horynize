import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusSmallIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} {...props}>
    <Path
      d="M13.8 64h100.4M64 13.8v100.4"
      style={{
        fill: "none",
        strokeWidth: 12,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        stroke: "#fff",
        strokeOpacity: 1,
        strokeMiterlimit: 10,
      }}
      transform="scale(.07813)"
    />
  </Svg>
)
export default PlusSmallIcon;