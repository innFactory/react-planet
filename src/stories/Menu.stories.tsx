import { IconButton, makeStyles, Paper, Theme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Planet } from '../components';
import { withTheme } from './index.stories';

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
}));
