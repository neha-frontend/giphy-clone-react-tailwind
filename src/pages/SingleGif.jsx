import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/GifProvider";
import Gif from "../components/Gif";
import { IoCodeSharp } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import FollowOn from "../components/FollowOn";

const SingleGif = () => {
  const contentType = ["gifs", "stickers", "texts"];
  const { type, slug } = useParams();
  const [signleGif, setSingleGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gif, addToFavorites, favorites } = GifState();
  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    const fetchGif = async () => {
      const gifId = slug.split("-");
      const { data } = await gif.gif(gifId[gifId.length - 1]);
      const { data: related } = await gif.related(gifId[gifId.length - 1], {
        limit: 10,
      });
      setSingleGif(data);
      setRelatedGifs(related);
    };

    fetchGif();
  }, []);
  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {signleGif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={signleGif?.user?.avatar_url}
                alt={signleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{signleGif?.user?.display_name}</div>
                <div className="faded-text">@{signleGif?.user?.username}</div>
              </div>
            </div>
            {signleGif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? signleGif?.user?.description
                  : signleGif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            )}
          </>
        )}
        <FollowOn />

        <div className="divider" />

        {signleGif?.source && (
          <div>
            <span
              className="faded-text" //custom - faded-text
            >
              Source
            </span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={signleGif.source} target="_blank" className="truncate">
                {signleGif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{signleGif.title}</div>
            <Gif gif={signleGif} hover={false} />

            {/* -- Mobile UI -- */}
            <div className="flex sm:hidden gap-1">
              <img
                src={signleGif?.user?.avatar_url}
                alt={signleGif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{signleGif?.user?.display_name}</div>
                <div className="faded-text">@{signleGif?.user?.username}</div>
              </div>

              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
            {/* -- Mobile UI -- */}
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(signleGif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.includes(signleGif.id) ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button className="flex gap-6 items-center font-bold text-lg">
              <FaPaperPlane size={25} />
              Share
            </button>
            <button className="flex gap-5 items-center font-bold text-lg">
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2 my-1">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
