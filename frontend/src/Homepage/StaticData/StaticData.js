import './styles/StaticData.css';
import StaticDataBox from './StaticDataBox';

function StaticData() {
    const metricsDict = {
        entry1: { color: 'rgb(252, 114, 255)', bgColor: 'rgba(252, 114, 255, 0.4)',title: 'Total Transaction Fee (USDT)', value: '100K' },
        entry2: { color: 'rgb(51 150 255)', bgColor:'rgba(51, 150, 255, 0.4)', title: 'Total Transaction Fee (ETH)', value: '200K' },
        entry3: { color: 'rgb(150 70 250)', bgColor: 'rgba(150, 70, 250, 0.4)', title: 'Current ETH/USDT Price', value: '50K' },
      };    

    return (
        <div className="static-data-wrapper">
            {Object.keys(metricsDict).map((key) => (
                <StaticDataBox
                key={key}
                color={metricsDict[key].color}
                bgColor={metricsDict[key].bgColor}
                title={metricsDict[key].title}
                value={metricsDict[key].value}
                />
            ))}
        </div>  
    );
}

export default StaticData;