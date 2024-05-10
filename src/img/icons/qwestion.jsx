import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Circle, Text } from "react-native-svg"
const qwestionIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <Defs>
      <LinearGradient id="a" x1="0%" x2="0%" y1="0%" y2="100%">
        <Stop
          offset="0%"
          style={{
            stopColor: "#feb84a",
            stopOpacity: 1,
          }}
        />
        <Stop
          offset="100%"
          style={{
            stopColor: "#ff5204",
            stopOpacity: 1,
          }}
        />
      </LinearGradient>
    </Defs>
    <Circle cx={20} cy={20} r={18} fill="url(#a)" />
    <Text
      x={20}
      y="50%"
      fill="#fff"
      dy=".3em"
      fontFamily="Arial"
      fontSize={20}
      textAnchor="middle"
    >
      {"\n    ?\n  "}
    </Text>
  </Svg>
)
export default qwestionIcon
