const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const search = async (term?: string) => {
  const response = await fetch(
    `${API_BASE_URL}/search-media?term=${term || ""}`
  );
  const data = await response.json();
  return data;
};

export const getPodcastById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/search-media/${id}`);
  const data = await response.json();
  return data;
};
