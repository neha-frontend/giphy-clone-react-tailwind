import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div
      className="faded-text pt-2" //custom - faded-text
    >
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="https://www.youtube.com" target="_blank">
          <FaYoutube size={20} />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.twitter.com" target="_blank">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
