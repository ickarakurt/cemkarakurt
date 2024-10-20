import getPageNumbers from "./getPageNumbers";

interface GetPaginationProps<T> {
  content: T;
  page: string | number;
  isIndex?: boolean;
  itemPerPage: number;
}

const getPagination = <T>({
  content,
  page,
  isIndex = false,
  itemPerPage,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(content.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastContent = isIndex ? itemPerPage : currentPage * itemPerPage;
  const firstContent = isIndex ? 0 : lastContent - itemPerPage;
  const paginatedContent = content.slice(firstContent, lastContent);

  return {
    totalPages,
    currentPage,
    paginatedContent,
  };
};

export default getPagination;
