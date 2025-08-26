const resolveImagePath = (picture: string) => {
  const IMAGE_BASE_PATH = "/images/general/";
  const DEFAULT_IMAGE = `${IMAGE_BASE_PATH}user.jpg`;

  if (!picture) {
    return DEFAULT_IMAGE;
  }

  if (picture.startsWith("http://") || picture.startsWith("https://")) {
    return picture;
  }

  if (picture === "user.jpg") {
    return DEFAULT_IMAGE;
  }

  return `${IMAGE_BASE_PATH}${picture}`;
};

export { resolveImagePath };
