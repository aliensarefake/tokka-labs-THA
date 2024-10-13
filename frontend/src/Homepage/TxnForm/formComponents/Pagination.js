import React from 'react';
import "./styles/Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination-main">
            <div 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className='pagination-button'
            >
                Previous
            </div>
            <div className='currPage'> Page {currentPage} of {totalPages} </div>
            <div 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className='pagination-button'
            >
                Next
            </div>
        </div>
    );
};

export default Pagination;
