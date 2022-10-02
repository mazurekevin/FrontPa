import {Link} from 'react-router-dom';
import './exception.css';
function RegisteredSuccessfully(){
    return(
    <div class="container2">
        <div className="row">
            <div className="text-center">
                <span className="display"> 🥰 Welcome 🥰 </span>
                <div className="lead">
                   Thank you for joining our community! Login to access to your profile!
                </div>
                <Link to="/signIn" className="btn">
                   Back to Login
                </Link>
            </div>
        </div>
    </div>
);
}

export default RegisteredSuccessfully;