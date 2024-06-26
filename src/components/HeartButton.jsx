import { useState } from "react";

export const HeartButton = ({ thoughtId, fetchThoughts }) => {
  const [numLikes, setNumLikes] = useState(thoughtId.hearts);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (!liked) {
        const response = await fetch(
          `https://project-happy-thoughts-api-bsct.onrender.com/thoughts/${thoughtId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          // increment the number of likes
          setNumLikes(numLikes + 1);
          // Update liked state to prevent multiple likes
          setLiked(true);
          //Fetch updated thoughts
          fetchThoughts(thoughtId);
        } else {
          console.error("Failed to like thought");
        }
      }
    } catch (error) {
      console.error("Error liking thought", error);
    }
  };

  return (
    <div>
      <button
        className={`like-button ${liked ? "clicked" : ""}`}
        /* this settup will toggle each time the button is cliked. will make the button stay pink when cliked */
        onClick={handleLike}
        aria-label="Like thought"
      >
        ❤️
      </button>
    </div>
  );
};
