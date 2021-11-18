import Pagination from "react-js-pagination";
import "./Paging.css";
import { useState } from "react";

function Paging() {
  const [page, setPage] = useState(1);
  console.log(page)

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={5}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );

}


export default Paging