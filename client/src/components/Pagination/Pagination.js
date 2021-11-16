import Paging from './Paging';
import './Pagination.css';
function Pagination({
  setPosts,
  setLoading,
  currentPage,
  setCurrentPage,
  postsPerPage,
  total,
  minPage,
  setMinPage,
  maxPage,
  setMaxPage,
}) {
  const handlePages = (e) => {
    setCurrentPage(parseInt(e.target.innerText));
  };
  const showPrev = () => {
    if (minPage > 5) {
      setMinPage(minPage - 5);
      setMaxPage(maxPage - 5);
      setCurrentPage(minPage - 5);
    }
  };
  const showNext = () => {
    console.log(maxPage);
    if (maxPage < Math.ceil(total / postsPerPage)) {
      setMinPage(currentPage);
      setMaxPage(maxPage + 5);
      setCurrentPage(currentPage + 5);
    }
  };
  console.log(minPage, maxPage, currentPage);

  return (
    <div className='Pagination-container'>
      <Paging
        minPage={minPage}
        maxPage={maxPage}
        currentPage={currentPage}
        handlePages={handlePages}
        showPrev={showPrev}
        showNext={showNext}
      />
    </div>
  );
}
export default Pagination;
