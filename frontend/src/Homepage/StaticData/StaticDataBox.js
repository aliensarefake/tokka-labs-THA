import './styles/StaticDataBox.css';

function StaticDataBox(props) {
    const { color, bgColor, title, value } = props;
    return (
        <div className="static-data-box-main" style={{ backgroundColor: bgColor }}>
            <div className="data-content">
                <div className="static-title-wrapper" style={{ color: color }}>
                    <span className="static-title">{title}</span>
                </div>
                <div className="static-value" style={{ color: color }}>{value}</div>
            </div>

        </div>  
    );
}

export default StaticDataBox;