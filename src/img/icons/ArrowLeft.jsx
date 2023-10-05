import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowLeft = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#ED7635"
      d="M19.613 10.827 14.44 16l5.173 5.173c.52.52.52 1.36 0 1.88-.52.52-1.36.52-1.88 0l-6.12-6.12c-.52-.52-.52-1.36 0-1.88l6.12-6.12c.52-.52 1.36-.52 1.88 0 .507.52.52 1.374 0 1.894Z"
    />
  </Svg>
)
export default ArrowLeft;