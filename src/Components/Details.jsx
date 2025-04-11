import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";

const PexelsUrl = "https://api.pexels.com/v1/search?query=";
const PexelsApiKey = "0aNgG7y14W7ZnAFgv0os2UpOU49ZwjNTUFuPikAXjaZrbo0QQ9abUcFX";

const Details = () => {
  const location = useLocation();
  const { weatherData } = location.state || {};
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if (weatherData && weatherData.name) {
      fetch(`${PexelsUrl}${weatherData.name}`, {
        headers: {
          Authorization: PexelsApiKey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Errore nel caricamento dell'immagine di sfondo.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.photos && data.photos.length > 0) {
            setBackgroundImage(data.photos[1].src.large); // Imposta l'immagine di sfondo
          } else {
            console.error("Nessuna immagine trovata per questa città.");
          }
        })
        .catch((err) => {
          console.error("Errore nella fetch dell'immagine:", err.message);
        });
    }
  }, [weatherData]);

  if (!weatherData) {
    return (
      <Container className="mt-5 text-center">
        <h1>Nessun dato disponibile</h1>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="pt-5"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "88vh",
        color: backgroundImage ? "white" : "black",
      }}
    >
      <h1 className="text-center">
        {" "}
        <span className="bg-info text-black">
          --Dettagli Meteo per {weatherData.name}, {weatherData.sys.country}--
        </span>{" "}
      </h1>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <strong>Coordinate</strong>
                </td>
                <td>
                  Latitudine: {weatherData.coord.lat}, Longitudine:{" "}
                  {weatherData.coord.lon}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Temperatura</strong>
                </td>
                <td>{Math.round(weatherData.main.temp - 273.15)}°C</td>
              </tr>
              <tr>
                <td>
                  <strong>Temperatura percepita</strong>
                </td>
                <td>{Math.round(weatherData.main.feels_like - 273.15)}°C</td>
              </tr>
              <tr>
                <td>
                  <strong>Temperatura minima</strong>
                </td>
                <td>{Math.round(weatherData.main.temp_min - 273.15)}°C</td>
              </tr>
              <tr>
                <td>
                  <strong>Temperatura massima</strong>
                </td>
                <td>{Math.round(weatherData.main.temp_max - 273.15)}°C</td>
              </tr>
              <tr>
                <td>
                  <strong>Pressione</strong>
                </td>
                <td>{weatherData.main.pressure} hPa</td>
              </tr>
              <tr>
                <td>
                  <strong>Umidità</strong>
                </td>
                <td>{weatherData.main.humidity}%</td>
              </tr>
              <tr>
                <td>
                  <strong>Velocità del vento</strong>
                </td>
                <td>{weatherData.wind.speed} m/s</td>
              </tr>
              <tr>
                <td>
                  <strong>Direzione del vento</strong>
                </td>
                <td>{weatherData.wind.deg}°</td>
              </tr>
              <tr>
                <td>
                  <strong>Copertura nuvolosa</strong>
                </td>
                <td>{weatherData.clouds.all}%</td>
              </tr>
              <tr>
                <td>
                  <strong>Visibilità</strong>
                </td>
                <td>{weatherData.visibility} m</td>
              </tr>
              <tr>
                <td>
                  <strong>Orario di alba</strong>
                </td>
                <td>
                  {new Date(
                    weatherData.sys.sunrise * 1000
                  ).toLocaleTimeString()}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Orario di tramonto</strong>
                </td>
                <td>
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Details;
