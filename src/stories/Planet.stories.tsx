import { IconButton, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { boolean, number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';

storiesOf('Planet', module).add('default', () => {
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

function generateSatellites(count: number, weird?: boolean, text?: boolean) {
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

storiesOf('Planet', module).add('menu', () => {
	const classes = useStyles();

	const bounce = boolean('bounce', false);
	const bounceOnClose = boolean('bounce on close', false);

	return withTheme(
		<div className={classes.root}>
			<Planet
				centerContent={
					<PaperButton color="#4da37c" iconColor="LIGHT">
						<MenuIcon />
					</PaperButton>
				}
				hideOrbit
				autoClose
				orbitRadius={60}
				bounce={bounce}
				bounceOnClose={bounceOnClose}
			>
				<PaperButton color="white" iconColor="DARK">
					<InfoIcon />
				</PaperButton>
				<PaperButton color="white" iconColor="DARK">
					<EditIcon />
				</PaperButton>
				<PaperButton color="white" iconColor="DARK">
					<DeleteIcon />
				</PaperButton>
			</Planet>
		</div>
	);
});

function PaperButton(props: { color: string; children: React.ReactNode; iconColor: 'LIGHT' | 'DARK' }) {
	return (
		<Paper style={{ backgroundColor: props.color, borderRadius: '50%' }}>
			<IconButton style={{ color: props.iconColor === 'LIGHT' ? 'white' : '#424242' }}>
				{props.children}
			</IconButton>
		</Paper>
	);
}

storiesOf('Planet', module).add('custom orbit', () => {
	const classes = useStyles();

	return withTheme(
		<div className={classes.root}>
			<Planet
				orbitStyle={(defaultStyle) => ({
					...defaultStyle,
					borderWidth: 4,
					borderStyle: 'dashed',
					borderColor: '#6f03fc',
				})}
				centerContent={<div className={classes.planetSmall} />}
				open
				orbitRadius={200}
				autoClose
			>
				{generateSatellites(3)}
			</Planet>
		</div>
	);
});

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

storiesOf('Planet', module).add('weird satelites', () => {
	const classes = useStyles();

	const satelliteOrientation = select(
		'satellite Orientation',
		{
			unset: undefined,
			DEFAULT: 'DEFAULT',
			INSIDE: 'INSIDE',
			OUTSIDE: 'OUTSIDE',
			READABLE: 'READABLE',
		},
		'READABLE'
	);

	return withTheme(
		<div className={classes.root}>
			<Planet
				centerContent={<div className={classes.planet} />}
				orbitRadius={200}
				open
				autoClose
				satelliteOrientation={satelliteOrientation}
			>
				{generateSatellites(9, true, !!satelliteOrientation)}
			</Planet>
		</div>
	);
});

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

	planetSmall: {
		height: 10,
		width: 10,
		backgroundColor: theme.palette.primary.main,
		borderRadius: '50%',
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

	iconButtonMain: {
		height: 40,
		width: 40,
	},
}));
