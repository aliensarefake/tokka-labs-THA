import React, { useState, useEffect } from 'react';
import './TxnForm.css';
import TxnTable from './formComponents/TxnTable';
import Pagination from './formComponents/Pagination';
import Searchbar from './formComponents/Searchbar';

const TxnForm = ({ transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const pageSize = 50;

    const totalTransactions = filteredTransactions.length;
    const totalPages = Math.ceil(totalTransactions / pageSize);

    const currentTransactions = filteredTransactions.slice(
        (currentPage - 1) * pageSize, 
        currentPage * pageSize
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    const handleSearch = (searchParams) => {
        if (searchParams.type === 'txId') {
            setFilteredTransactions(transactions.filter(txn => txn.txHash.includes(searchParams.query)));
        } else if (searchParams.type === 'timeRange') {
            setFilteredTransactions(transactions.filter(txn => {
                const txnTime = new Date(txn.timestamp).getTime();
                const startTime = new Date(searchParams.start).getTime();
                const endTime = new Date(searchParams.end).getTime();
                return txnTime >= startTime && txnTime <= endTime;
            }));
        }
        setCurrentPage(1); 
    };

    useEffect(() => {
        if (filteredTransactions.length === 0) {
            setCurrentPage(0);
        }
    }, [filteredTransactions]);


    return (
        <div className='txnForm-main'>
            <Searchbar onSearch={handleSearch}/>
            <TxnTable transactions={currentTransactions}/>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    );
};

export default TxnForm;