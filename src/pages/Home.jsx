import '../styles/Home.scss';
import { Icons } from '../icons/Icons.jsx';

export const Home = () => {
    return (
        <div className='home'>
            <div className='home-content'>
                <header className='top'>
                    <p className='current-date'>5 Feb, 2026</p>
                    <div className='search-container'>
                        <input
                            type='text'
                            placeholder='Search for a city...'
                            className='city-search'
                        />
                        <button className='search-button'>
                            Search
                        </button>
                    </div>
                </header>
                <main className='main'>
                    <section className='main-top'>
                        <div className='main-top-left'>word</div>
                        <div className='main-top-right'>
                            <div className='misc-data'>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                                <div className='box'>placeholder</div>
                            </div>
                        </div>
                    </section>
                    <section className='main-middle'>
                        <div className='hourly-forecast-container'>
                            <div className='hourly-forecast'>
                                <p>Hourly forecast</p>
                            </div>
                        </div>
                    </section>
                    <section className='main-bottom'>
                        <div className='daily-forecast-container'>
                            <div>
                                <p>Daily forecast</p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
};
