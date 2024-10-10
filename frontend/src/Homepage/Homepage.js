import './Homepage.css';
import Header from './Header/Header';
import StaticData from './StaticData/StaticData';

function Homepage() {
    return (
        <div className="homepage-main">
            <Header/>
            <StaticData/>
        </div>  
    );
}

export default Homepage;