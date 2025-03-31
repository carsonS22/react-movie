const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "718c9fca03a6f70384e7ad5b3b156851",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
