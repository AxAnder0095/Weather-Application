import '../styles/SearchBar.scss';

export const SearchBar = ({ search, setSearch, onSearch, isLoading, error }) => {
    const current_time = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    const handleClick = () => {
        onSearch();
    };

    return (
        <header className='top'>
            <p className='current-date'>{current_time}</p>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Enter your zip code to find your city...'
                    className='city-search'
                    value={search}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <button className='search-button' onClick={handleClick} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
            </div>
            {error ? <p className='search-error'>{error}</p> : null}
        </header>
    );
};