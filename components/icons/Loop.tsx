import { Path, Svg } from "react-native-svg";

function Loop({ isActive }: { isActive: boolean }) {
    return (
        <Svg width="18" height="18" viewBox="0 0 18 18">
            <Path
                d="M6.63332 17L3.5564 13.9231L6.63332 10.8462"
                stroke={isActive ? "#7209B7" : "#7A7A7A"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <Path
                d="M17.0949 10.2308V12.6924C17.0949 13.0188 16.9652 13.3319 16.7344 13.5627C16.5036 13.7935 16.1905 13.9232 15.8641 13.9232L3.5564 13.9232"
                stroke={isActive ? "#7209B7" : "#7A7A7A"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <Path
                d="M11.5566 1.00008L14.6336 4.07701L11.5566 7.15393"
                stroke={isActive ? "#7209B7" : "#7A7A7A"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
            <Path
                d="M1.09497 7.76929L1.09497 5.30775C1.09497 4.98133 1.22464 4.66828 1.45545 4.43746C1.68627 4.20665 1.99932 4.07698 2.32574 4.07698L14.6334 4.07698"
                stroke={isActive ? "#7209B7" : "#7A7A7A"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </Svg>
    );
}

export default Loop;
