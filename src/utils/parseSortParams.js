const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
};
