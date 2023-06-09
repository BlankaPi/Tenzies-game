import React from 'react'
import "./die.scss"

const Die = (props) => {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div
            className="die"
            style={styles}
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die