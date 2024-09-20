import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        setCities,
        setIsLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("the useCities is used outside the provider");
  return context;
}

export { CityProvider, useCities };
