import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const LockIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeWidth={2}
      d="M4 13c0-1.886 0-2.828.586-3.414C5.172 9 6.114 9 8 9h8c1.886 0 2.828 0 3.414.586C20 10.172 20 11.114 20 13v2c0 2.828 0 4.243-.879 5.121C18.243 21 16.828 21 14 21h-4c-2.828 0-4.243 0-5.121-.879C4 19.243 4 17.828 4 15v-2Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M16 8V7a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v1"
    />
    <Circle cx={12} cy={15} r={2} fill="#fff" />
  </Svg>
)
export default LockIcon;