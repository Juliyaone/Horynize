import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
const ApplyIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M12 6.5c0-.24 0-.359.08-.433.082-.074.194-.065.42-.046a6 6 0 1 1-5.428 9.401c-.13-.186-.194-.279-.17-.386.024-.107.128-.166.335-.286l4.513-2.606c.122-.07.183-.105.216-.163.034-.058.034-.129.034-.27V6.5Z"
    />
    <Circle cx={12} cy={12} r={9} stroke="#fff" strokeWidth={2} />
  </Svg>
)
export default ApplyIcon;

