const formatSlug = (fallback) => ({ operation, value, originalDoc, data }) => {
  if (typeof value === 'string') {
    return value
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase();
  }

  const fallbackData = data[fallback] || originalDoc[fallback];

  if (fallbackData && typeof fallbackData === 'string') {
    return fallbackData
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
      .toLowerCase();
  }

  return value;
};

module.exports = { formatSlug }; 