export async function fetchData<T>(query: string): Promise<T> {
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${import.meta.env.DATOCMS_TOKEN}`,
      // "X-Environment": "develop",
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();
  if (!json.data) {
    const message =
      json.errors?.map((e: { message: string }) => e.message).join("; ") ??
      `HTTP ${response.status} ${response.statusText}`;
    throw new Error(
      `DatoCMS GraphQL failed (${message}). Set a valid DATOCMS_TOKEN in .env and restart the dev server.`,
    );
  }
  return json.data;
}
