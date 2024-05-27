import { useParams } from "react-router-dom";
import { GifState } from "../context/GifProvider";
import { useEffect, useState } from "react";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

const Category = () => {
  const { category } = useParams();

  const { gif } = GifState();

  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async () => {
    const { data } = await gif.gifs(category, category);

    setSearchResults(data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {searchResults.length > 0 && <Gif gif={searchResults[0]} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>
        <FollowOn />
        <div className="divider"></div>
      </div>
      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">
          {category.split("-").join(" & ")} GIFs
        </h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
        {searchResults.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 xl:columns-5">
            {searchResults.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
