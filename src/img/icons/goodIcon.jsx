import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const GoodIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Circle cx={12} cy={12} r={9} stroke="#fff" strokeWidth={2} />
    <Path stroke="#fff" strokeWidth={2} d="m8 12 3 3 5-6" />
  </Svg>
)
export default GoodIcon;

