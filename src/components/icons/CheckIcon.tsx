import Svg, { Path } from 'react-native-svg';

type Props = {
    size?: number;
    color?: string;
}
function CheckIcon({ size = 20, color = "#ffffff" }: Props) {
    return (

        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
            <Path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}

export default CheckIcon