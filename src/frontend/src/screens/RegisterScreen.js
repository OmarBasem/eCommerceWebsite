import React, {Component} from "react";
import {common} from '../actions';
import s from './css/main.module.css'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class RegisterScreen extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        sending: false,
        registering: false
    }

    register = () => {
        if (this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.password2 === '')
            alert("Please, fill in the missing fields!")
        else if (this.state.password.length < 6)
            alert('Password must be at least 6 characters!')
        else if (this.state.password !== this.state.password2)
            alert('Passwords do not match!')
        else if (!this.state.email.includes('@'))
            alert('Please, enter a valid email!')
        else {
            this.setState({sending: true})
            this.props.register(this.state.name, this.state.email, this.state.password, () => {
                this.props.history.push('/')
            }, () => this.setState({sending: false}))
        }
    }

    login = () => {
        if (this.state.email === '' || this.state.password === '')
            alert("Please, fill in the missing fields!")
        else if (!this.state.email.includes('@'))
            alert('Please, enter a valid email!')
        else {
            this.setState({sending: true})
            this.props.login(this.state.email, this.state.password, () => {
                this.props.history.push('/')
            }, () => this.setState({sending: false}))
        }
    }

    render() {
        if (this.state.registering)
            return (
                <div className={s.registrationBody}>
                    <Link to='/' className={s.logoTitleReg}>ComfrtShop.Com</Link>
                    <div className={s.form} onSubmit={this.register}>
                        <p className={s.formHeader}>Create Account</p>
                        <label>Full name</label>
                        <input required type="text" className="form-control"
                               onChange={e => this.setState({name: e.target.value})}/>
                        <label>Email</label>
                        <input className="form-control" onChange={e => this.setState({email: e.target.value})}/>
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="at least 6 characters"
                               onChange={e => this.setState({password: e.target.value})}/>
                        <label>Re-enter Password</label>
                        <input type="password" className="form-control"
                               onChange={e => this.setState({password2: e.target.value})}/>

                        <div onClick={this.register} className={s.button}  style={{maxWidth: screen.width >= 1000 ? '28vw' : '85vw'}}>
                            {this.state.sending ? <div className={s.loader}/> :
                                <p className={s.buttonText}>Register</p>}
                        </div>

                        <p className="forgot-password text-right">
                            Already registered? <a href='#login' onClick={() => this.setState({registering: false})}>Log
                            in</a>
                        </p>
                    </div>
                </div>
            );
        return (
            <div className={s.registrationBody}>
                <Link to='/' className={s.logoTitleReg}>ComfrtShop.Com</Link>
                <div className={s.form} onSubmit={this.register}>
                    <p className={s.formHeader}>Log In</p>
                    <label>Email</label>
                    <input className="form-control" onChange={e => this.setState({email: e.target.value})}/>
                    <label>Password</label>
                    <input type="password" className="form-control"
                           onChange={e => this.setState({password: e.target.value})}/>

                        <div onClick={this.login} className={s.button} style={{maxWidth: screen.width >= 1000 ? '28vw' : '85vw'}}>
                                 {this.state.sending ? <div className={s.loader}/> :
                            <p className={s.buttonText}>Log In</p>}
                        </div>

                    <p className="forgot-password text-right">Don't have an account? <a href='#create-account'
                                                                                        onClick={() => this.setState({registering: true})}>Register</a>
                    </p>
                </div>
            </div>
        );
    }
}


export default connect(null, {...common})(RegisterScreen);