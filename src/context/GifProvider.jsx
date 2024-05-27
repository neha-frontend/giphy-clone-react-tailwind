/* eslint-disable react/prop-types */
import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useState } from "react";

export const GifContext = createContext();

export const GifProvider = ({ children }) => {
  const gif = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);
  return (
    <GifContext.Provider
      value={{ gif, gifs, filter, favorites, setGifs, setFilter, setFavorites }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};
