import {Link} from 'react-router-dom';
import './exception.css';
function NotFoundError(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display">404</span>
                <div className="lead">
                    Oops! We can't seem find the page you're looking for.
                </div>
                <Link to="/" className="btn">
                   Back to Home
                </Link>
            </div>
        </div>
    </div>
);
}

export default NotFoundError;