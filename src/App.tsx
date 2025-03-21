import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // Weather states
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
  const [errorWeather, setErrorWeather] = useState<string | null>(null);

  // Quote states
  const [quote, setQuote] = useState<string>("");
  const [loadingQuote, setLoadingQuote] = useState<boolean>(false);
  const [errorQuote, setErrorQuote] = useState<string | null>(null);

  // Users states (Authentication)
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");

  // Fetch Weather
  const fetchWeather = async () => {
    setLoadingWeather(true);
    setErrorWeather(null);
    try {
      const response = await axios.get("http://localhost:5016/WeatherForecast");
      setWeatherData(response.data);
    } catch (error) {
      setErrorWeather("Failed to fetch weather data");
    } finally {
      setLoadingWeather(false);
    }
  };

  // Fetch Random Quote
  const fetchRandomQuote = async () => {
    setLoadingQuote(true);
    setErrorQuote(null);
    try {
      const response = await axios.get("http://localhost:5016/WeatherForecast/random-quote");
      // API returns { Quote: "..." } so access as response.data.quote
      setQuote(response.data.quote);
    } catch (error) {
      setErrorQuote("Failed to fetch random quote");
    } finally {
      setLoadingQuote(false);
    }
  };

  // Fetch Users from Authentication API
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const response = await axios.get("http://localhost:5016/api/Authentication");
      setUsers(response.data);
    } catch (error) {
      setErrorUsers("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  // Create a New User
  const createUser = async () => {
    if (!newUsername || !newEmail) return;
    try {
      const response = await axios.post("http://localhost:5016/api/Authentication", {
        username: newUsername,
        email: newEmail,
      });
      // Append the newly created user to the list
      setUsers([...users, response.data]);
      setNewUsername("");
      setNewEmail("");
    } catch (error) {
      setErrorUsers("Failed to create user");
    }
  };

  return (
    <div className="container">
      <h1>Weather Forecast, Random Quote, & Users</h1>

      <div className="buttons">
        <button onClick={fetchWeather} className="fetch-button">
          Fetch Weather
        </button>
        <button onClick={fetchRandomQuote} className="fetch-button">
          Fetch Quote
        </button>
        <button onClick={fetchUsers} className="fetch-button">
          Fetch Users
        </button>
      </div>

      {/* Weather Section */}
      <div className="weather-section">
        <h2>Weather</h2>
        {loadingWeather && <p>Loading weather...</p>}
        {errorWeather && <p className="error">{errorWeather}</p>}
        {!loadingWeather && !errorWeather && weatherData.length > 0 && (
          <ul>
            {weatherData.map((weather, index) => (
              <li key={index} className="card">
                <h3>{weather.date}</h3>
                <p>Temperature: {weather.temperatureC}°C</p>
                <p>Summary: {weather.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quote Section */}
      <div className="quote-section">
        <h2>Random Quote</h2>
        {loadingQuote && <p>Loading quote...</p>}
        {errorQuote && <p className="error">{errorQuote}</p>}
        {!loadingQuote && !errorQuote && quote && (
          <blockquote>{quote}</blockquote>
        )}
      </div>

      {/* Users Section */}
      <div className="users-section">
        <h2>Users</h2>
        {loadingUsers && <p>Loading users...</p>}
        {errorUsers && <p className="error">{errorUsers}</p>}
        {!loadingUsers && !errorUsers && users.length > 0 && (
          <ul>
            {users.map((user: any) => (
              <li key={user.id} className="card">
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="create-user">
          <h3>Create New User</h3>
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={createUser}>Create User</button>
        </div>
      </div>
    </div>
  );
}

export default App;
