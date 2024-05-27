import { useEffect } from "react";
import { GifState } from "../context/GifProvider";
import Gif from "../components/Gif";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gif, gifs, setGifs, filter } = GifState();
  const fetchTrendingGIFs = async () => {
    const { data: gifs } = await gif.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(gifs);
  };

  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  console.log(gifs, "gifs");

  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className="mt-2 rounded w-full"
      />
      <FilterGif showTrending />
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {gifs.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
