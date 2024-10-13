import './Homepage.css';
import Header from './Header/Header';
import StaticData from './StaticData/StaticData';
import TxnForm from './TxnForm/TxnForm';

const transactions = [
    { 
      txHash: '0xA340...42fc', 
      from: '0xA340...42fc', 
      to: '0xF4bE...3dFe', 
      txnFeeUSDT: '$1000.52', 
      txnFeeETH: '0.406', 
      timestamp: '44s ago', 
      ethToUsdtRate: '2500.00' 
    },
    { 
      txHash: '0xab05...5D7C', 
      from: '0xab05...5D7C', 
      to: '0xa12...6a4A', 
      txnFeeUSDT: '$756.15', 
      txnFeeETH: '0.307', 
      timestamp: '44s ago', 
      ethToUsdtRate: '2500.00' 
    },
    { 
      txHash: '0x0a12...6a4A', 
      from: '0xa12...6a4A', 
      to: '0xF4bE...3dFe', 
      txnFeeUSDT: '$467.97', 
      txnFeeETH: '0.190', 
      timestamp: '44s ago', 
      ethToUsdtRate: '2500.00' 
    },
    { 
      txHash: '0xF4bE...3dFe', 
      from: '0xF4bE...3dFe', 
      to: '0xB383...01D6', 
      txnFeeUSDT: '$1004.72', 
      txnFeeETH: '0.408', 
      timestamp: '56s ago', 
      ethToUsdtRate: '2500.00' 
    }
  ];
  

function Homepage() {
    return (
        <div className="homepage-main">
            <Header/>
            <StaticData/>
            <TxnForm transactions={transactions}/>
        </div>  
    );
}

export default Homepage;