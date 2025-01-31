import styles from "./Calculator.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Calculator() {
    const navigate = useNavigate();

    const [num1, setNum1] = useState<string>("");
    const [num2, setNum2] = useState<string>("");
    const [operation, setOperation] = useState<string>("+");
    const [res, setRes] = useState<string>("");

    const Calculate = () => {
        const n1 = Number(num1);
        const n2 = Number(num2);

        if (isNaN(n1) || isNaN(n2) || num1 === "" || num2 === "") {
            alert("Please enter valid numbers");
            return;
        }

        let result: number;
        switch (operation) {
            case "+":
                result = n1 + n2;
                break;
            case "-":
                result = n1 - n2;
                break;
            case "*":
                result = n1 * n2;
                break;
            case "/":
                if (n2 === 0) {
                    alert("Cannot divide by zero");
                    setNum1("");
                    setNum2("");
                    setRes("");
                    return;
                }
                result = n1 / n2;
                break;
            default:
                return;
        }
        setRes(result.toString());
    };

    const Clear = () => {
        setNum1("");
        setNum2("");
        setRes("");
    };

    const Return = () => {
        navigate("/");
    };

    return (
        <div className={styles.blog}>
            <div className={styles.main}>
                <input
                    placeholder="Enter your first number"
                    type="text"
                    value={num1}
                    onChange={(event) => setNum1(event.target.value)}
                />

                <select value={operation} onChange={(event) => setOperation(event.target.value)}>
                    <option>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                </select>

                <input
                    placeholder="Enter your second number"
                    type="text"
                    value={num2}
                    onChange={(event) => setNum2(event.target.value)}
                />

                <button onClick={Calculate}>=</button>
                <input placeholder="Result" type="text" value={res} readOnly />
            </div>

            <div className={styles.alternative}>
                <button onClick={Clear}>Clear</button>
                <button onClick={Return}>Return to Home</button>
            </div>
        </div>
    );
}