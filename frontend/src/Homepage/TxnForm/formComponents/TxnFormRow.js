import React from 'react';

const TxnFormRow = ({ txn }) => {
    return (
        <tr>
            <td>{txn.txHash}</td>
            <td>{txn.from}</td>
            <td>{txn.to}</td>
            <td>{txn.txnFeeUSDT}</td>
            <td>{txn.txnFeeETH}</td>
            <td>{txn.timestamp}</td>
        </tr>
    );
};

export default TxnFormRow;