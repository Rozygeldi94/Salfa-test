import { FC } from "react";
import ReactPaginate from "react-paginate";

interface IPaginationProps {
  handlePageClick: ({ selected }: { selected: number }) => void;
  pageCount: number;
}

export const Pagination: FC<IPaginationProps> = ({
  handlePageClick,
  pageCount,
}) => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={pageCount ? pageCount : 0}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagenation-container"
        pageLinkClassName="pagenation-page-link"
        previousLinkClassName="pagenation-previous-link"
        nextLinkClassName="pagenation-next-link"
        activeLinkClassName="pagenation-active-link"
      />
    </>
  );
};
