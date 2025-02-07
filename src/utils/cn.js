const cn = (...args) =>
  args
    .flat()
    .filter(Boolean)
    .flatMap((item) =>
      typeof item === "object"
        ? Object.keys(item).filter((key) => item[key])
        : item
    )
    .join(" ");

export default cn;
