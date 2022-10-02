import {Link} from 'react-router-dom';
import './exception.css';
function ErrorWhenRegistered(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display">Error</span>
                <div className="lead">
                    Oops! It seems that your username or mail are already taken! Please change them and try to Register again...
                </div>
                <Link to="/signUp" className="btn">
                   Back to Register
                </Link>
            </div>
        </div>
    </div>
);
}

export default ErrorWhenRegistered;