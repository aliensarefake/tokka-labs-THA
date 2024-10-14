import './Homepage.css';
import Header from './Header/Header';
import StaticData from './StaticData/StaticData';
import TxnForm from './TxnForm/TxnForm';

function Homepage() {
    return (
        <div className="homepage-main">
            <Header/>
            <StaticData/>
            <TxnForm/>
        </div>  
    );
}

export default Homepage;