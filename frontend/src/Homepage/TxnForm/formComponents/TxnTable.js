import React from 'react';
import './styles/TxnTable.css'
import TxnFormHeader from './TxnFormHeader';
import TxnFormRow from './TxnFormRow';

const TxnTable = ({ transactions }) => {
  return (
    <table className="txn-table">
        <thead>
            <TxnFormHeader />
        </thead>
        <tbody>
            {transactions.map((txn, index) => (
                <TxnFormRow key={index} txn={txn} />
            ))}
        </tbody>
    </table>
  );
};

export default TxnTable;