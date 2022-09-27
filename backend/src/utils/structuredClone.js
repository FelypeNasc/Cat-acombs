export default function structuredClone(element) {
  const string = JSON.stringify(element);
  const parsed = JSON.parse(string);
  return parsed;
}
