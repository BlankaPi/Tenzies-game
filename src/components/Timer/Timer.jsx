import "./timer.scss"


const Timer = (props) => {

    const minutes = ("0" + Math.floor((props.time / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((props.time / 1000) % 60)).slice(-2);
    const miliSec = ("0" + ((props.time / 10) % 100)).slice(-2);


    return (
        <div className="timer-container">
            <h1>Time</h1>
            <div className="clock">
                <span>{minutes}:</span>
                <span>{seconds}:</span>
                <span>{miliSec}</span>
            </div>
        </div>
    )
}

export default Timer