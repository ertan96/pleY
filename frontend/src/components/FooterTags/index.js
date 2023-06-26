import './FooterTags.css';
import { BsYelp } from "react-icons/bs";

function FooterTags() {

    return (
        <div className='footer-page'>
            <div className='footer-container'>
                <div className='footer-contents'>
                    <div className='footer-header'>
                        <h3 className='footer-title'>pleY <BsYelp className='yelp-icon'/></h3>
                        <h4>Explore restuarants, leave reviews, view ratings, and discover new places.</h4>
                    </div>
                    <div className='footer-bottom'>
                        <ul>
                            <li>Frontend</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Redux</li>
                            <li>CSS</li>
                        </ul>
                        <ul>
                            <li>Backend</li>
                            <li>Ruby</li>
                            <li>Rails</li>
                            <li>SQL</li>
                        </ul>
                        <ul>
                            <li>Others</li>
                            <li>AWS S3</li>
                            <li>Google Maps API</li>
                        </ul>
                    </div>
                    <div className='copyright'>
                        <h2>Copyright &copy; 2023 <span className='bold-text'>pleY</span> <BsYelp className='yelp-icon'/>. All Rights Reserved</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterTags;