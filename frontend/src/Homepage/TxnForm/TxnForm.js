import React, { useState, useEffect } from 'react';
import './TxnForm.css';
import TxnTable from './formComponents/TxnTable';
import Pagination from './formComponents/Pagination';
import Searchbar from './formComponents/Searchbar';

const TxnForm = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
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

    const handleSearch = async (searchParams) => {
        if (searchParams.type === 'txId') {
            try {
                const response = await fetch(`http://localhost:4100/transactions/${searchParams.query}`);
                if (!response.ok) {
                    throw new Error('Transaction not found');
                }
                const transaction = await response.json();
                setFilteredTransactions([transaction]); 
            } catch (error) {
                console.error('Error fetching transaction:', error);
            }
        } else if (searchParams.type === 'timeRange') {
            try {
                const startTime = encodeURIComponent(searchParams.start);
                const endTime = encodeURIComponent(searchParams.end);
    
                const response = await fetch(`http://localhost:4100/transactions?startTime=${startTime}&endTime=${endTime}`);
                if (!response.ok) {
                    throw new Error('Error fetching transactions');
                }
                const transactions = await response.json();
                setFilteredTransactions(transactions); 
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
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
            <Searchbar 
                onSearch={handleSearch}
                setFilteredTransactions={setFilteredTransactions}
            />
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