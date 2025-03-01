import { useEffect, useState } from "react";
import "./App.css";
import Background from "./assets/comp/Background";

function App() {
    const [binary, setBinary] = useState("");
    const [decimal, setDecimal] = useState("");
    const [input, setInput] = useState("");
    const [attempts, setAttempts] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/generate")
            .then(res => res.json())
            .then(data => {
                setBinary(data.binary);
                setDecimal(data.decimal);
            });
    }, []);

    const checkAnswer = (e) => {
        e.preventDefault();

        if (input === "" || input < 0) {
            setMessage("Por favor, insira um número válido e maior ou igual a 0!");
            setMessageType("error"); 
            return;
        }

       
        if (input === decimal) {
            setMessage("Parabéns! Você acertou!");
            setMessageType("success");
            setTimeout(() => window.location.reload(), 2000); 
        } else {
            setAttempts([input, ...attempts]);
            setMessage("Resposta incorreta, tente novamente!");
            setMessageType("warning");
        }

        setInput("");
    };

    return (
        <div className="main-screen">
            <h1>Converta o Binário para Decimal.</h1>
            <h2>{binary}</h2>
            <form onSubmit={checkAnswer} id="form">
                <input
                    type="number"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite o valor decimal"
                    min="0"
                    step="1"
                />
                <button type="submit">Enviar</button>
            </form>

            {/* Mensagem de resposta estilizada */}
            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <ul className="erros-list">
                {attempts.map((attempt, index) => (
                    <li key={index}>{attempt}</li>
                ))}
            </ul>
            <Background />
        </div>
    );
}

export default App;
