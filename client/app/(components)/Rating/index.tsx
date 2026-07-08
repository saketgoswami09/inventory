import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          color={index <= rating ? "#FFC107" : "#E4E5E9"}
          fill={index <= rating ? "#FFC107" : "none"} // 💡 Adding fill makes filled stars look solid!
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};

export default Rating;