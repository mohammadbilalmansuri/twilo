export default function formatClasses(classNames) {
  return classNames.replace(/\s{2,}/g, " ").trim();
}
