import {Link} from 'react-router-dom';
import './exception.css';
function AlreadyConnectedError(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display">Error</span>
                <div className="lead">
                    Oops! You are already connected!
                </div>
                <Link to="/" className="btn">
                   Back to Home
                </Link>
            </div>
        </div>
    </div>
);
}

export default AlreadyConnectedError;