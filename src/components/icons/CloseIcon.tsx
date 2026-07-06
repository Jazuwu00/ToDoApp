import Svg, { Path } from 'react-native-svg';

type Props ={
    size?: number;
    color?: string;
}
function CloseIcon({size = 20, color = "#ffffff"}: Props) {
    return (
        <Svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill="none">
            <Path d="M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <Path d="M18 6L6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </Svg>
    )
}

export default CloseIcon