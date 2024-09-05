import { ApifyClient } from "apify-client";

export async function post({ request }) {
  const { username } = await request.json();

  const client = new ApifyClient({ token: import.meta.env.APIFY_TOKEN });

  try {
    const { defaultDatasetId } = await client.actor("apify/instagram-profile-scraper").call(
      {
        usernames: [username],
      },
      { waitSecs: 60 }
    );

    const { items } = await client.dataset(defaultDatasetId).listItems();

    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
