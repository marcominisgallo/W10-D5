import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const APIkey = "&lang=it&appid=9cbaaaa522c58d0d33a66d2c7b365d26";
const PexelsUrl = "https://api.pexels.com/v1/search?query=";
const PexelsApiKey = "0aNgG7y14W7ZnAFgv0os2UpOU49ZwjNTUFuPikAXjaZrbo0QQ9abUcFX";

const Search = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [error, setError] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    if (weatherData) {
      navigate("/details", { state: { weatherData } });
    } else {
      setError("Nessun dato meteo disponibile per visualizzare i dettagli.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        console.log(data);
        setWeatherData(data);

        return fetch(`${PexelsUrl}${city}`, {
          headers: {
            Authorization: PexelsApiKey,
          },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dell'immagine di sfondo.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.photos && data.photos.length > 0) {
          setBackgroundImage(data.photos[1].src.large);
        } else {
          setError("Nessuna immagine trovata per questa città.");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container
      fluid
      className="text-center d-flex flex-column justify-content-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: backgroundImage ? "white" : "black",
      }}
    >
      <h1 className="text-center mb-5">Cerca la tua città</h1>
      <Form onSubmit={handleSubmit} className="mt-5">
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
        <Row>
          <Col
            sm={8}
            md={6}
            xl={4}
            className="offset-sm-2 offset-md-3 offset-xl-4"
          >
            <Card className="mt-5 d-flex flex-column align-items-center py-4">
              <h2>Dati Meteo per {weatherData.name}</h2>
              <p>Temperatura: {Math.round(weatherData.main.temp - 273.15)}°C</p>
              <p>Descrizione: {weatherData.weather[0].description}</p>
              <p>Umidità: {weatherData.main.humidity}%</p>
              <Container fluid>
                <Row
                  className="d-flex
                flex-column align-items-center"
                >
                  <Col xs={8} md={7} xl={6}>
                    <Button onClick={handleDetailsClick} className="w-100">
                      Maggiori dettagli
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Card>
          </Col>
        </Row>
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
