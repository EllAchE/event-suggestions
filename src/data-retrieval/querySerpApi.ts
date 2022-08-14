const serpapi = require('google-search-results-nodejs');

export default function querySerpApi(
  googleQuery: string,
  callback: (response: any) => void
): void {
  const search = new serpapi.GoogleSearch();

  const params = {
    q: googleQuery,
    google_domain: 'google.com',
    gl: 'us',
    hl: 'en',
    api_key: 'ae432bb4eade9985f9af2cd8d94a411516a216b598a697992b4f9bbe150c832f', // TODO: This should be an env var
  };

  console.info('third party callback about to execute');
  search.json(params, callback);
}
