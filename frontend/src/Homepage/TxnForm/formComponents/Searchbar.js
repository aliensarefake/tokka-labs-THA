import React, { useState } from 'react';
import "./styles/Searchbar.css"

const Searchbar = ({ onSearch }) => {
    const [searchMode, setSearchMode] = useState('txId'); // 'txId' or 'timeRange'
    const [searchQuery, setSearchQuery] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSearch = () => {
        if (searchMode === 'txId') {
            onSearch({ type: 'txId', query: searchQuery });
        } else if (searchMode === 'timeRange') {
            onSearch({ type: 'timeRange', start: startTime, end: endTime });
        }
    };

    return (
        <div className="search-bar-container">
            <div className="search-toggle">
                <div 
                    className={`toggle-option ${searchMode === 'txId' ? 'active' : ''}`} 
                    onClick={() => setSearchMode('txId')}
                >
                    Search by TxId
                </div>
                <div 
                    className={`toggle-option ${searchMode === 'timeRange' ? 'active' : ''}`} 
                    onClick={() => setSearchMode('timeRange')}
                >
                    Search by Time Range
                </div>
            </div>
            <div className='second-row'>
                {searchMode === 'txId' ? (
                    <div className="search-input">
                        <div 
                            className="custom-input"
                            contentEditable
                            placeholder="Enter TxId"
                            onInput={(e) => setSearchQuery(e.target.textContent)}
                        >
                            {searchQuery}
                        </div>
                    </div>
                ) : (
                    <div className="time-range-inputs">
                        <input
                            type="datetime-local"
                            placeholder="Start Time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            placeholder="End Time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                )}
                <div className="search-button" onClick={handleSearch}>Search</div>
            </div>
        </div>
    );
};

export default Searchbar;