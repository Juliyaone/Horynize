import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BtnMinusIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12} // Adjusted to maintain consistency with the plus icon
      viewBox="0 0 12 12" // Added to ensure the SVG scales correctly
      fill="none"
      {...props}
    >
      <Path
        fill="#ED7635"
        d="M11 5H1a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2z"
      />
    </Svg>
  )
}

export default BtnMinusIcon;
