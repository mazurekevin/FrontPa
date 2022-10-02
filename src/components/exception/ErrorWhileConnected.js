import {Link} from 'react-router-dom';
import './exception.css';
function ErrorWhenConnected(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display">Error</span>
                <div className="lead">
                    Oops! Your username or password are not correct! Please try to Login again...
                </div>
                <Link to="/signIn" className="btn">
                   Back to Login
                </Link>
            </div>
        </div>
    </div>
);
}

export default ErrorWhenConnected;