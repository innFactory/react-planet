import { makeStyles, Theme } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

storiesOf('Planet', module).add('half', () => {
	const classes = useStyles();

	return withTheme(
		<div className={classes.root}>
			<Planet centerContent={<div className={classes.planet} />} hideOrbit open autoClose rotation={90}>
				{generateSatellites(3)}
				<div />
				<div />
				<div />
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
}));
