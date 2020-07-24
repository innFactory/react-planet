import { makeStyles, Theme } from '@material-ui/core';
import { boolean, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

storiesOf('Planet', module).add('-> configure', () => {
	const classes = useStyles();

	const open = boolean('open', true);
	const autoClose = boolean('autoClose', true);
	const orbitRadius = number('orbit Radius', 120, { range: true, min: 80, max: 300, step: 10 });
	const satelliteCount = number('satellite count', 3, {});
	const weirdSatellites = boolean('weird Satellites', false);
	const satelliteOrientation = select(
		'satellite Orientation',
		{
			unset: undefined,
			DEFAULT: 'DEFAULT',
			INSIDE: 'INSIDE',
			OUTSIDE: 'OUTSIDE',
			READABLE: 'READABLE',
		},
		undefined
	);
	const dragableSatellites = boolean('dragable Satellites', false);
	const dragRadiusSatellites = number('dragRadius Satellites', 12, { range: true, min: 0, max: 100, step: 1 });
	const dragablePlanet = boolean('dragable Planet', false);
	const dragRadiusPlanet = number('dragRadius Planet', 12, { range: true, min: 0, max: 100, step: 1 });
	const hideOrbit = boolean('hide Orbit', false);
	const bounce = boolean('bounce', false);
	const bounceOnOpen = boolean('bounce on open', false);
	const bounceOnClose = boolean('bounce on close', false);
	const bounceRadius = number('bounce Radius', 3, { range: true, min: 1, max: 40, step: 1 });
	const bounceDirection = select(
		'bounce Direction',
		{
			unset: undefined,
			TOP: 'TOP',
			BOTTOM: 'BOTTOM',
			LEFT: 'LEFT',
			RIGHT: 'RIGHT',
		},
		undefined
	);

	const rotation = number('rotation', 0, { range: true, min: 0, max: 360, step: 5 });
	const mass = number('mass', 1, {});
	const tension = number('tension', 500, {});
	const friction = number('friction', 17, {});

	return withTheme(
		<div className={classes.root}>
			<Planet
				orbitRadius={orbitRadius}
				centerContent={<div className={classes.planet} />}
				open={open}
				autoClose={autoClose}
				dragableSatellites={dragableSatellites}
				dragRadiusSatellites={dragRadiusSatellites}
				dragablePlanet={dragablePlanet}
				dragRadiusPlanet={dragRadiusPlanet}
				hideOrbit={hideOrbit}
				rotation={rotation}
				mass={mass}
				tension={tension}
				friction={friction}
				bounce={bounce}
				bounceOnOpen={bounceOnOpen}
				bounceOnClose={bounceOnClose}
				bounceRadius={bounceRadius}
				bounceDirection={bounceDirection}
				satelliteOrientation={satelliteOrientation}
			>
				{generateSatellites(satelliteCount, weirdSatellites, !!satelliteOrientation)}
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
