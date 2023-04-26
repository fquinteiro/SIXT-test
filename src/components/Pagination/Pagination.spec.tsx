import { fireEvent, render } from '@testing-library/react';
import { Pagination, PaginationProps } from './Pagination';

describe('Pagination', () => {
  const defaultProps: PaginationProps = {
    current: 2,
    pageSize: 10,
    totalItems: 40,
    onPageChange: jest.fn(),
  };

  it('should render correctly', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
  });

  it('should call onPageChange with the previous page number when clicking the "Previous" button', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByText('Previous'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with the next page number when clicking the "Next" button', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    fireEvent.click(getByText('Next'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable the "Previous" button when the current page is 1', () => {
    const { getByText } = render(<Pagination {...defaultProps} current={1}/>);
    const previousButton = getByText('Previous') as HTMLButtonElement;
    expect(previousButton.disabled).toBe(true);
  });

  it('should disable the "Next" button when the current page is the last page', () => {
    const { getByText } = render(
      <Pagination {...defaultProps} current={2} totalItems={15} />
    );
    const nextButton = getByText('Next') as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });
});