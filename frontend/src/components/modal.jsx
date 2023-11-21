import { CheckBox } from '@mui/icons-material';
import React from 'react';
import '../styles/modal.css'

const Modal = ({open}) => {
    if(!open) return null;
    return (
       <div className='overlay'>
            <div className='modal-container'>
                <div className='modal-contents'>
                    <form>
                        <h2>Login</h2>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" />
                        </div>
                        <div className="user-type-select">
                            <label htmlFor="userType">User Type:</label>
                            <select name="userType" id="userType">
                                <option value="userA">User A</option>
                                <option value="userB">User B</option>
                            </select>
                        </div>

                        <button className="submit" type="submit">Login</button>
                        {/* Addition buttons for Account Creation and Password Updating */}
                        <div className="additional-options">
                            <button type="button">Create Account</button>
                            <button type="button">Forgot Password</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Modal;