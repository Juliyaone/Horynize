import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PlusIcon = (props) => (
  <Svg width={14} height={14} {...props}>
    <Path
      d="M13.786 64h100.428M64 13.786v100.428"
      style={{
        fill: "none",
        strokeWidth: 12,
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        stroke: "#fff",
        strokeOpacity: 1,
        strokeMiterlimit: 10,
      }}
      transform="scale(.10938)"
    />
  </Svg>
)
export default PlusIcon;
