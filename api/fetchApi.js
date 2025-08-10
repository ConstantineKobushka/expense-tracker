export async function apiFetchHtml(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Помилка завантаження ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.text();
}
