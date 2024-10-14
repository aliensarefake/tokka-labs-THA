import React from 'react';
import './styles/TxnFormRow.css'

import { CAShortner } from '../../../utils/CAShortener';
import { formatValue } from '../../../utils/formatValue';

const TxnFormRow = ({ txn }) => {
    return (
        <tr className='form-row'>
            <td>{CAShortner(txn.txHash)}</td>
            <td>{CAShortner(txn.fromAddress)}</td>
            <td>{CAShortner(txn.toAddress)}</td>
            <td>{formatValue(txn.txFeeUSDT)}</td>
            <td>{formatValue(txn.txFeeETH, 6)}</td>
            <td>{txn.timestamp}</td>
        </tr>
    );
};

export default TxnFormRow;