import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const APIkey = "&lang=it&appid=9cbaaaa522c58d0d33a66d2c7b365d26";

const Search = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/details");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setWeatherData("");

    if (city.trim() === "") {
      setError("Il campo città non può essere vuoto.");
      return;
    }

    fetch(`${URL}${city}${APIkey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Errore nella ricerca della città. Controlla il nome e riprova."
          );
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data); // Salva i dati meteo nello stato
      })
      .catch((err) => {
        setError(err.message); // Gestisce eventuali errori
      });
  };

  return (
    <Container className="mt-5 text-center">
      <h1 className="text-center">Cerca la tua città</h1>
      <Form onSubmit={handleSubmit} className="mt-4">
        <div className="d-flex align-items-center justify-content-center">
          <Form.Control
            type="text"
            placeholder="Inserisci il nome della città"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="me-2"
            style={{ maxWidth: "300px" }}
          />
          <Button variant="primary" type="submit">
            Cerca
          </Button>
        </div>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {weatherData && (
        <div className="mt-5">
          <h2>Dati Meteo per {weatherData.city.name}</h2>
          <p>
            Temperatura: {Math.round(weatherData.list[0].main.temp - 273.15)}°C
          </p>
          <p>Descrizione: {weatherData.list[0].weather[0].description}</p>
          <p>Umidità: {weatherData.list[0].main.humidity}%</p>
          <Button onClick={handleDetailsClick}>Maggiori dettagli</Button>
        </div>
      )}
      <div className="mt-4">
        <svg width="450" height="120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#FFD700", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#FFA500", stopOpacity: 1 }}
              />
            </linearGradient>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#d0e4f7", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#a0b8d8", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Sole */}
          <circle cx="60" cy="50" r="20" fill="url(#sunGrad)" />
          {/* Raggi del sole */}
          <g stroke="#FFA500" strokeWidth="2">
            <line x1="60" y1="20" x2="60" y2="5" />
            <line x1="60" y1="80" x2="60" y2="95" />
            <line x1="30" y1="50" x2="15" y2="50" />
            <line x1="90" y1="50" x2="105" y2="50" />
            <line x1="42" y1="32" x2="30" y2="20" />
            <line x1="78" y1="32" x2="90" y2="20" />
            <line x1="42" y1="68" x2="30" y2="80" />
            <line x1="78" y1="68" x2="90" y2="80" />
          </g>

          {/* Nuvola */}
          <g fill="url(#cloudGrad)">
            <ellipse cx="120" cy="70" rx="30" ry="20" />
            <ellipse cx="150" cy="65" rx="35" ry="25" />
            <ellipse cx="180" cy="75" rx="30" ry="20" />
            <ellipse cx="150" cy="80" rx="40" ry="25" />
          </g>

          {/* Testo */}
          <text
            x="200"
            y="85"
            fontFamily="'Segoe UI', sans-serif"
            fontSize="30"
            fill="#333"
          >
            <tspan fontWeight="bold">Minis</tspan>
            <tspan fill="#1e90ff">Meteo</tspan>
          </text>
        </svg>
      </div>
    </Container>
  );
};

export default Search;
