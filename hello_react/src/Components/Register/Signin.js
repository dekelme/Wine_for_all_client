import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './SignIn.css';
import Footer from '../All/Footer';
import GoogleLogin from 'react-google-login';
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
			display: 'flex',
			marginLeft: '25%',
			marginTop: '6%',
		},
	},
}));

export default function Login(props) {
	let history = useHistory();
	const [cookie, setCookie] = useCookies(['user']);
	const classes = useStyles();

	const googleSuccess = async (response) => {
		const token = response.tokenId
		// // console.log(body);
		// fetch(`http://localhost:3000/api/auth/login`, {
		// 	method: 'POST',
		// 	mode: 'no-cors',
		// 	credentials: 'include',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: { token: response.tokenId},
		// })
		axios.post(`https://wine-for-all.herokuapp.com/api/auth/login`, { token }, { withCredentials: true, credentials: 'include' })
			// .then(response => response.json())
			.then(result => {
				const cookiePromise = new Promise((resolve, reject) => {
					setCookie('user', result.data)
					resolve()
				});
				
				const user = result.data
				cookiePromise.then(() => {
					if (user) {
						if (user.phone === null || user.gender === null || user.dateOfBirth === null || user.city === null || user.street === null || user.zip === null || user.founded === null) {
							return (
								history.push('/SignInDeatails')
							)
						}
						else {
							history.push('/HomePage')
						}
					}
				})
			});
	}
	const googleFailure = (response) => {
		console.log(response);
	}
	return (
		<div className={'background'}>
			<h1 className={"headSignIn"}>Wine For All</h1>
			<div className={"signInContainer"}>
				<p>Sign In With Google</p>
				<div className={"googleLogIn"}>
					<GoogleLogin
						className={classes.google}
						clientId="825313538325-lvb6k6275qjiev6j0tq1rrt7tuqsmd88.apps.googleusercontent.com"
						onSuccess={googleSuccess}
						onFailure={googleFailure}
					/>
				</div>
			</div>
			<Footer />
		</div>
	);
}

