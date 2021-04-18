import React, {Component} from "react";
import FaFacebook from "react-icons/lib/fa/facebook";
import FaTwitter from "react-icons/lib/fa/twitter";
import FaInstagram from "react-icons/lib/fa/instagram";
import FaLinkedin from "react-icons/lib/fa/linkedin";

import s from '../screens/css/main.module.css'

class Footer extends Component {

    render() {
        return (
            <footer>
                <div className={s.socialButtons}>
                        <a><FaFacebook className={s.icon}/></a>
                        <a><FaTwitter className={s.icon}/></a>
                        <a><FaInstagram className={s.icon}/></a>
                        <a><FaLinkedin className={s.icon}/></a>
                </div>
                <p className={s.copyright}>© Comfrtshop.com 2021 | Code & Design by <a href='https://omarbasem.com'>Omar Basem</a></p>
            </footer>
        )
    }
}

export default Footer;