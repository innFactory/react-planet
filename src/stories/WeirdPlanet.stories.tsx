import { makeStyles, Theme } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

storiesOf('Planet', module).add('weird planet', () => {
	const classes = useStyles();

	return withTheme(
		<div className={classes.root}>
			<Planet centerContent={<div className={classes.planetWeird} />} open orbitRadius={90} autoClose>
				{generateSatellites(6)}
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

	planetWeird: {
		height: 30,
		width: 90,
		backgroundColor: theme.palette.primary.dark,
		borderRadius: '10%',
		'&:hover': {
			backgroundColor: theme.palette.primary.main,
			cursor: 'pointer',
		},
	},
}));
