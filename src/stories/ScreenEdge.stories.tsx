import { makeStyles, Theme } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

storiesOf('Planet', module).add('-> configure', () => {
	const classes = useStyles();

	return withTheme(
		<div className={classes.screen}>
			<div className={classes.planetContainer}>
				<Planet
					centerContent={<div className={classes.planet} />}
					open
					autoClose
					hideOrbit={true}
					rotation={120}
					mass={3}
					tension={500}
					friction={17}
				>
					{generateSatellites(3)}
					<div />
					<div />
				</Planet>
			</div>
		</div>
	);
});

const useStyles = makeStyles((theme: Theme) => ({
	screen: {
		display: 'flex',
		backgroundColor: '#cbdcf7',
		justifyContent: 'center',
		alignItems: 'center',
		height: 400,
		width: 400,
		margin: 100,
	},

	planetContainer: {
		position: 'absolute',
		top: 375,
		left: 120,
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
