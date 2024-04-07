const Pagination = ({ page, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumbersDisplayed = 5;

  if (totalPages <= maxPageNumbersDisplayed) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(
      startPage + maxPageNumbersDisplayed - 1,
      totalPages
    );

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {"<< Précédent"}
      </button>
      {pageNumbers.map((number) => {
        if (number === "...") {
          return <span key={number}>...</span>;
        }
        return (
          <button
            key={number}
            className={number === page ? "active" : null}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        {"Suivant >>"}
      </button>
    </div>
  );
};
export default Pagination;
