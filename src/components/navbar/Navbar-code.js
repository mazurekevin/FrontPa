import React from 'react';
import Select from 'react-select';
import './Navbar-code.css';

const Navbar_code = ({userLang, setUserLang}) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];

    return (
        <div className="navbar">

            <Select options={languages} value={userLang}
                    onChange={(e) => setUserLang(e.value)}
                    placeholder={userLang} />
        </div>
    )
}

export default Navbar_code
