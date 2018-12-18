const getSiteName = () => {
  const endSlash = location.pathname.indexOf('/', 1);
  const pathname = endSlash >= 0 ? location.pathname.slice(1, endSlash) : location.pathname.slice(1);

  return pathname;
};

export default getSiteName;
