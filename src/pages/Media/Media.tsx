import styles from "./Media.module.css"
import { useNavigate } from "react-router-dom";

export default function Media() {
    let navigate = useNavigate();

    return(
        <div className={styles.main}>
            <a href="https://twitter-indol-rho.vercel.app" target="_blank" rel="noopener noreferrer">
                Open Twitter Clone
            </a>

            <button onClick={() =>{
                navigate("/");
            }}>
                Back to Home
            </button>

        </div>
    )
}