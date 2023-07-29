import axios from 'axios';

export async function fetchImages(searchResult, pageNumber) {
  const searchParams = new URLSearchParams({
    key: '37447910-ed3fb6b843fd00e4ff71a16f5',
    q: searchResult,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pageNumber,
    per_page: 12,
  });

  const response = await axios.get('https://pixabay.com/api/?' + searchParams);
  return await response.data;
}
