import { makeStyles, Theme } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';
import { generateSatellites } from './storybook_utils.tsx/generateSatellites';

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
}));
