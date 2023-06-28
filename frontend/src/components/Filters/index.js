import './Filters.css';


function Filters() {
    return (
        <div className='filter-container'>
            <div className='filter-header'>
                Filters
            </div>
            <div className='filter-dollars'>
                <button className='first-but'>$</button>
                <button className='second-but'>$$</button>
                <button className='third-but'>$$$</button>
                <button className='fourth-but'>$$$$</button>
            </div>
            <div className='filter-bottom-half'>
                <div className='filter-suggested-container'>
                    <h2>Suggested</h2>
                    <ul>
                        <li><input type="checkbox" /> Open Now 8:00 PM</li>
                        <li><input type="checkbox" /> Offers Delivery</li>
                        <li><input type="checkbox" /> Reservations</li>
                        <li><input type="checkbox" /> Offerst Takeout</li>
                        <li><input type="checkbox" /> Good for Dinner</li>
                        <li><input type="checkbox" /> Hot and New</li>
                    </ul>
                </div>
                <div>
                    <h2>Category</h2>
                    <ul>
                        <li><input type="checkbox" /> Japanese</li>
                        <li><input type="checkbox" /> Vietnamese</li>
                        <li><input type="checkbox" /> American</li>
                        <li><input type="checkbox" /> Chinese</li>
                    </ul>
                </div>
                <div>
                    <h2>Features</h2>
                    <ul>
                        <li><input type="checkbox" /> Good for Kids</li>
                        <li><input type="checkbox" /> Good for Groups</li>
                        <li><input type="checkbox" /> Has TV</li>
                        <li><input type="checkbox" /> Outdoor Seating</li>
                    </ul>
                </div>
                <div>
                    <h2>Neighborhoods</h2>
                    <ul>
                        <li><input type="checkbox" /> Alamo Square</li>
                        <li><input type="checkbox" /> Anza Vista</li>
                        <li><input type="checkbox" /> Ashbury Heights</li>
                        <li><input type="checkbox" /> Balboa Terrace</li>
                    </ul>
                </div>
                <div>
                    <h2>Distance</h2>
                    <ul>
                        <li><input type="radio" name="distance" /> Bird's-eye View</li>
                        <li><input type="radio" name="distance" /> Driving (5 mi.)</li>
                        <li><input type="radio" name="distance" /> Biking (2 mi.)</li>
                        <li><input type="radio" name="distance" /> Walking (1 mi.)</li>
                        <li><input type="radio" name="distance" /> Within 4 blocks</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Filters;