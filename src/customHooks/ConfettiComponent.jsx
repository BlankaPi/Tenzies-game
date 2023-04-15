import Confetti from 'react-confetti';
import { useEffect, useState } from "react";

const ConfettiComponent = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);


    return (
        <Confetti
            width={width}
            height={height}
        />
    )
}

export default ConfettiComponent;