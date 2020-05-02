// prettier-ignore
import { makeStyles } from '@material-ui/core';
import { CreateCSSProperties, CSSProperties } from '@material-ui/styles';
import * as React from 'react';
import { animated, useSpring } from 'react-spring';

interface Props {
	orbitStyle?: (defaultStyle: CSSProperties | CreateCSSProperties<{}>) => CSSProperties | CreateCSSProperties<{}>;
	orbitRadius: number;
	planetWidth: number;
	planetHeight: number;
	open: boolean;
	mass: number;
	tension: number;
	friction: number;
}

export function Orbit(props: Props) {
	const { orbitRadius, planetWidth, planetHeight, open, tension, friction, mass } = props;
	const classes = useStyles(props);
	const position = useSpring({
		reverse: !open,
		from: getInitalOrbitPosition(planetWidth, planetHeight),
		to: getFinalOrbitPosition(planetWidth, planetHeight, orbitRadius),
		config: { mass, tension, friction },
	});

	return <animated.div className={classes.orbit} style={position} />;
}

function getInitalOrbitPosition(planetWidth: number, planetHeight: number) {
	return {
		width: 0,
		height: 0,
		top: planetWidth / 2,
		left: planetHeight / 2,
		opacity: 0,
	};
}

function getFinalOrbitPosition(planetWidth: number, planetHeight: number, orbitRadius: number) {
	return {
		width: orbitRadius * 2,
		height: orbitRadius * 2,
		top: 0 - orbitRadius + planetHeight / 2,
		left: 0 - orbitRadius + planetWidth / 2,
		opacity: 1,
	};
}

const orbitDefaultStyle: CSSProperties | CreateCSSProperties<{}> = {
	position: 'absolute',
	borderRadius: '100%',
	borderWidth: 2,
	borderStyle: 'dotted',
	borderColor: 'lightgrey',
	zIndex: 0,
};

const useStyles = makeStyles({
	orbit: (props: Props) =>
		props.orbitStyle ? (props.orbitStyle(orbitDefaultStyle) as any) : (orbitDefaultStyle as any),
});
