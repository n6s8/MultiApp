import styles from "./Home.module.css"
import { useNavigate} from "react-router-dom";

export default function Home(){
    let navigate = useNavigate();
    return (
        <div className={styles.main}>
            <button onClick={() => {
                navigate("Calculator");
            }}> Calculator
            </button>
            <button onClick={() => {
                navigate("WeatherApp");
            }}> WeatherApp
            </button>
            <button onClick={() => {
                navigate("Media");
            }}>
                Media
            </button>
            <button onClick={() => {
                navigate("Recipes");
            }}>
                Recipes
            </button>
        </div>
    )
}