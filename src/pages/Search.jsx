import { useParams } from "react-router-dom";
import { GifState } from "../context/GifProvider";
import FilterGif from "../components/FilterGif";
import { useEffect, useState } from "react";
import Gif from "../components/Gif";

const Search = () => {
  const { query } = useParams();
  const { gif, filter } = GifState();
  const [searchResults, setSearchResults] = useState([]);
  const fetchSearchResults = async () => {
    const { data } = await gif.search(query, {
      sort: "relevant",
      lang: "en",
      type: filter,
      limit: 20,
    });

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [filter, query]);
  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold capitalize">{query}</h2>
      <FilterGif alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {searchResults.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>
          No GIFs found for {query}. Try searching for Stickers instead?
        </span>
      )}
    </div>
  );
};

export default Search;
