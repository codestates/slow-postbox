import './Paging.css';
import { useEffect } from 'react';
function Paging({
  minPage,
  maxPage,
  currentPage,
  handlePages,
  showPrev,
  showNext,
}) {
  const pageNums = [];
  console.log(minPage, maxPage);
  for (let i = minPage; i <= maxPage; i++) {
    pageNums.push(
      <span
        key={i}
        className={i === currentPage ? 'pages active-page' : 'pages'}
        onClick={(e) => handlePages(e)}
      >
        {i}
      </span>
    );
  }

  return (
    <div className='paging-container'>
      <button className='btn-prev' onClick={showPrev}>
        이전
      </button>
      <div className='pages-wrapper'>{pageNums}</div>
      <button className='btn-next' onClick={showNext}>
        다음
      </button>
    </div>
  );
}
export default Paging;
