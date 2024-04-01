const formatDate = (date: string) => {
  const dateFormat = new Intl.DateTimeFormat('fr-FR');
  const actualDate = new Date(date);
  return dateFormat.format(actualDate);
};

export default formatDate;
