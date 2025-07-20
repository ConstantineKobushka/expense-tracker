export async function apiFetchHtml(url) {
  const response = await fetch(url);
  return response.text();
}
