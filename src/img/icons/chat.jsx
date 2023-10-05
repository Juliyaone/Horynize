import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ChatIcon = (props) => (
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
      d="M4 12a8 8 0 1 1 16 0v5.09c0 .848 0 1.27-.126 1.609a2 2 0 0 1-1.175 1.175C18.36 20 17.937 20 17.09 20H12a8 8 0 0 1-8-8Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 11h6M12 15h3"
    />
  </Svg>
)
export default ChatIcon;