import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { signin } from './ReduxStore/actions/userActions';

export default function SingInScreen(props) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	  
  const userSignin = useSelector(state => state.userSignin);
	const {loading, userInfo, error } = userSignin;
	
	const redirect = props.location.search ?
		props.location.search.split('=')[1] : "/";

		
		const submitHandler = (e) => {
			e.preventDefault();
			dispatch(signin(email, password))
		}
		
		useEffect(() => {
			if (userInfo) {
				props.history.push(redirect);
			}
		}, [props.history, redirect, userInfo]);
		
	return (
	 <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}; 