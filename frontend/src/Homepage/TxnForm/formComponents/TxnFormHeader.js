import React from 'react';
import './styles/TxnFormHeader.css'

const TxnFormHeader = () => {
  return (
    <tr className='form-header'>
      <th>Transaction Hash</th>
      <th>From Address</th>
      <th>To Address</th>
      <th>Transaction Fee (USDC)</th>
      <th>Transaction Fee (ETH)</th>
      <th>Timestamp</th>
    </tr>
  );
};

export default TxnFormHeader;