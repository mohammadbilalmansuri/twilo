const formatTime = (time) => {
  const now = new Date();
  const postTime = new Date(time);
  const diffMilliseconds = now - postTime;
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 5) return "Just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  const options = { month: "short", day: "numeric" };
  if (diffYears === 0) return postTime.toLocaleDateString("en-US", options);

  return postTime.toLocaleDateString("en-US", {
    ...options,
    year: "numeric",
  });
};

export default formatTime;
