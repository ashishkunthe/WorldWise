import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>MAP</h1>
      <h3>
        Position:{lat},{lng}
      </h3>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 35 });
        }}
      >
        Set The Positions
      </button>
    </div>
  );
}

export default Map;
