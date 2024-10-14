import React from 'react';
import './styles/TxnTable.css'
import TxnFormHeader from './TxnFormHeader';
import TxnFormRow from './TxnFormRow';

const TxnTable = ({ transactions, message="No transaction found!" }) => {
  return (
    <table className="txn-table">
        <thead>
            <TxnFormHeader />
        </thead>
        <tbody>
            {
              transactions.length > 0 
                ? transactions.map((txn, index) => (
                    <TxnFormRow key={index} txn={txn} />
                  ))  
                  : <tr className='empty-body-wrapper'>
                      <td className='empty-body' colSpan={"6"}>
                        {message}
                      </td>
                    </tr>
            }
        </tbody>
    </table>
  );
};

export default TxnTable;