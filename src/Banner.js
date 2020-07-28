// RFCE
import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchBanner() {
      const request = await axios.get(fetchUrl);
      const data = request.data.results;
      const banner = Math.floor(Math.random() * data.length - 1);
      // const banner_img = data[banner].backdrop_path;
      setMovie(data[banner]);
      return banner;
    }
    fetchBanner();
  }, [fetchUrl]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center-center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
