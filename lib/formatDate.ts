const formatDate = (timestamp: string | number, joinText: string = '.'): string => {
  const d = new Date(timestamp);
  return d.toISOString().slice(0, 10).split('-').join(joinText);
};

export default formatDate;
