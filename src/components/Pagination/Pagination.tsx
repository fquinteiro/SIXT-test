import './Pagination.css';

export interface PaginationProps {
  current: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

export function Pagination({ current, pageSize, totalItems, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className='button-container'>
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === totalPages}
      >
        Next
      </button>
    </div>
  );
}
