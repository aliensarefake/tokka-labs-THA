import React from 'react';

const TxnFormHeader = () => {
  return (
    <tr>
      <th>Transaction Hash</th>
      <th>From Address</th>
      <th>To Address</th>
      <th>Transaction Fee (USDT)</th>
      <th>Transaction Fee (ETH)</th>
      <th>Timestamp</th>
    </tr>
  );
};

export default TxnFormHeader;