const truncateContent = (content, numWords) => {
  const words = content.split(/\s+/);
  if (words.length <= numWords) {
    return content;
  }
  return `${words.slice(0, numWords).join(" ")}...`;
};

export default truncateContent;
