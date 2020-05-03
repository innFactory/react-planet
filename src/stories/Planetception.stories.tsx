import { makeStyles, Theme } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

storiesOf('Planet', module).add('planetception (planets as satellites)', () => {
	const classes = useStyles();

	return withTheme(
		<div className={classes.root}>
			<Planet centerContent={<div className={classes.planet} />} open orbitRadius={220}>
				<Planet centerContent={<div className={classes.planetception} />} autoClose>
					{generateSatellites(3)}
				</Planet>
				<Planet centerContent={<div className={classes.planetception} />} autoClose>
					{generateSatellites(3)}
				</Planet>
				<Planet centerContent={<div className={classes.planetception} />} autoClose>
					{generateSatellites(3)}
				</Planet>
			</Planet>
		</div>
	);
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 600,
	},
	planet: {
		height: 100,
		width: 100,
		borderRadius: '50%',
		backgroundColor: theme.palette.primary.main,
		'&:hover': {
			borderWidth: 10,
			boxShadow: '0px 0px 15px 10px ' + theme.palette.secondary.light,
			cursor: 'pointer',
		},
	},

	planetception: {
		position: 'absolute',
		top: -15,
		left: -15,
		height: 30,
		width: 30,
		backgroundColor: theme.palette.secondary.main,
		borderRadius: '50%',
		'&:hover': {
			borderWidth: 10,
			boxShadow: '0px 0px 15px 10px ' + theme.palette.secondary.light,
			cursor: 'pointer',
		},
	},
}));
