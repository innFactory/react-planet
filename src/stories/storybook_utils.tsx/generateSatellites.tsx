import { makeStyles, Theme, Typography } from '@material-ui/core';
import * as React from 'react';

export function generateSatellites(count: number, weird?: boolean, text?: boolean) {
	const classes = useStyles();

	const satellites = [];
	let only3 = 1;

	for (let i = 0; i < count; i++) {
		if (weird) {
			satellites.push(
				<div
					key={'weird_satellite_' + i + '_' + weird + '_' + text}
					className={
						only3 === 1
							? classes.satelliteWeird1
							: only3 === 2
							? classes.satelliteWeird2
							: classes.satelliteWeird3
					}
				>
					{text && <Typography>{only3 === 1 ? '1' : only3 === 2 ? '2' : '3'}</Typography>}
				</div>
			);
		} else {
			satellites.push(
				<div
					key={'satellite_' + i + '_' + weird + '_' + text}
					className={only3 === 1 ? classes.satellite1 : only3 === 2 ? classes.satellite2 : classes.satellite3}
				>
					{text && <Typography variant="h5">{i + 1}</Typography>}
				</div>
			);
		}

		only3++;
		if (only3 > 3) {
			only3 = 1;
		}
	}

	return satellites;
}

const useStyles = makeStyles((theme: Theme) => ({
	satellite1: {
		height: 50,
		width: 50,
		borderRadius: '50%',
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},

	satellite2: {
		height: 50,
		width: 50,
		borderRadius: '50%',
		backgroundColor: theme.palette.secondary.dark,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},

	satellite3: {
		height: 50,
		width: 50,
		borderRadius: '50%',
		backgroundColor: theme.palette.secondary.light,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},

	satelliteWeird1: {
		height: 120,
		width: 20,
		backgroundColor: '#f5e298',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#424242',
	},

	satelliteWeird2: {
		height: 30,
		width: 100,
		borderRadius: '25%',
		backgroundColor: '#db7948',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},

	satelliteWeird3: {
		height: 50,
		width: 80,
		borderRadius: '50%',
		backgroundColor: '#aabf73',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},
}));
