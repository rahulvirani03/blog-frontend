import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

export const BlogTime = ({ blogTimeVariable }) => {
  let timeAgo = "";
  if (blogTimeVariable) {
    const date = parseISO(blogTimeVariable);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `-${timePeriod} ago`;
  }
  return (
    <span
      style={{
        fontSize: "12px",
        alignSelf: "baseline",
        color: "#808080",
      }}
    >
      {timeAgo}
    </span>
  );
};
