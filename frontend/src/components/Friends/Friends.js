import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Friend from './Friend/Friend';

const useStyles = makeStyles(() => ({
	root: {
		backgroundColor: "white",
		marginBottom: "30px"
	},
	title: {
		fontWeight: 'bold'
	},
	container: {
		display: 'flex',
		padding: '0.5em 0.5em'
	},
	controls: {
		marginLeft: 'auto'
	},
	control: {
		marginLeft: '0.5em'
	}
}));  

export default function Friends(props) {
	const classes = useStyles();

	let friends = props.friends.map((d, i) => <Friend key={i} friend={d}/>);

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<div>
					<span className={classes.title}>Friends</span>
				</div>
				<div className={classes.controls}>
					<svg className={classes.control} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0)">
							<path d="M14 18.375V16.625C14 15.6967 13.6313 14.8065 12.9749 14.1501C12.3185 13.4937 11.4283 13.125 10.5 13.125H4.375C3.44674 13.125 2.5565 13.4937 1.90013 14.1501C1.24375 14.8065 0.875 15.6967 0.875 16.625V18.375" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M7.4375 9.625C9.3705 9.625 10.9375 8.058 10.9375 6.125C10.9375 4.192 9.3705 2.625 7.4375 2.625C5.5045 2.625 3.9375 4.192 3.9375 6.125C3.9375 8.058 5.5045 9.625 7.4375 9.625Z" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M17.5 7V12.25" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M20.125 9.625H14.875" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</g>
						<defs>
							<clipPath id="clip0">
								<rect width="21" height="21" fill="white"/>
							</clipPath>
						</defs>
					</svg>
					<svg className={classes.control} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0)">
							<path d="M14 18.375V16.625C14 15.6967 13.6313 14.8065 12.9749 14.1501C12.3185 13.4937 11.4283 13.125 10.5 13.125H4.375C3.44674 13.125 2.5565 13.4937 1.90013 14.1501C1.24375 14.8065 0.875 15.6967 0.875 16.625V18.375" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M7.4375 9.625C9.3705 9.625 10.9375 8.058 10.9375 6.125C10.9375 4.192 9.3705 2.625 7.4375 2.625C5.5045 2.625 3.9375 4.192 3.9375 6.125C3.9375 8.058 5.5045 9.625 7.4375 9.625Z" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M15.75 7L20.125 11.375" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M20.125 7L15.75 11.375" stroke="#25282B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</g>
						<defs>
							<clipPath id="clip0">
								<rect width="21" height="21" fill="white"/>
							</clipPath>
						</defs>
					</svg>
				</div>
			</div>
			<div>
				{friends}
			</div>
		</div>
	)
}
