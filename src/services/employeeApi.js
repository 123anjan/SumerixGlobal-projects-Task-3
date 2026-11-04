const BASE_URL = "https://randomuser.me/api/";

export async function fetchUsers(count = 24) {
  const params = new URLSearchParams({
    results: count,
    seed: "sumerix",
    nat: "us,gb,au",
    inc: "login,name,email,phone,picture,location",
  });
  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Request failed (HTTP ${response.status})`);
  }
  const data = await response.json();
  return data.results;
}
