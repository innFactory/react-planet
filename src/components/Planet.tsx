// prettier-ignore
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import { CreateCSSProperties, CSSProperties } from "@material-ui/styles";
import * as React from "react";
import { ReactElement, useLayoutEffect, useRef } from "react";
import { DragableContainer } from "./DragableContainer";
import { Orbit } from "./Orbit";
import { Satellite } from "./Satellite";

const DEFAULT_MASS = 1;
const DEFAULT_TENSTION = 500;
const DEFAULT_FRICTION = 17;
const DEFAULT_ROTATION = 0;
const DEFAULT_RADIUS = 100;

interface Props {
  centerContent?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mass?: number;
  tension?: number;
  friction?: number;
  orbitStyle?: (
    defaultStyle: CSSProperties | CreateCSSProperties<{}>
  ) => CSSProperties | CreateCSSProperties<{}>;
  orbitRadius?: number;
  rotation?: number;
  hideOrbit?: boolean;
  autoClose?: boolean;
  onClose?: (
    e: React.MouseEvent<Document | HTMLDivElement, MouseEvent>
  ) => void;
  dragablePlanet?: boolean;
  dragRadiusPlanet?: number;
  dragableSatellites?: boolean;
  dragRadiusSatellites?: number;
  bounceRadius?: number;
  bounce?: boolean;
  bounceOnOpen?: boolean;
  bounceOnClose?: boolean;
  bounceDirection?: "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
  satelliteOrientation?: "DEFAULT" | "INSIDE" | "OUTSIDE" | "READABLE";
}

export function Planet(props: Props) {
  const {
    centerContent,
    children,
    open,
    onClick,
    mass,
    tension,
    friction,
    orbitRadius,
    rotation,
    orbitStyle,
    hideOrbit,
    onClose,
    autoClose,
    dragablePlanet,
    dragRadiusPlanet,
    dragableSatellites,
    dragRadiusSatellites,
    bounceRadius,
    bounce,
    bounceOnOpen,
    bounceOnClose,
    bounceDirection,
    satelliteOrientation,
  } = props;
  const classes = useStyles(props);
  const targetRef = useRef<any>();
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [_open, setOpen] = React.useState(!!open);

  React.useEffect(() => {
    setOpen(!!open);
  }, [open]);

  useLayoutEffect(() => {
    if (targetRef && targetRef.current) {
      setWidth(targetRef.current.offsetWidth);
      setHeight(targetRef.current.offsetHeight);
    }
  }, [targetRef]);

  var satellites: ReactElement<any>[] = [];
  var satelliteCount = React.Children.count(children);
  React.Children.forEach(children, (c, i) => {
    satellites[i] = (
      <Satellite
        key={i}
        index={i}
        open={_open}
        satelliteCount={satelliteCount}
        planetHeight={height}
        planetWidth={width}
        mass={mass ? mass : DEFAULT_MASS}
        friction={friction ? friction : DEFAULT_FRICTION}
        tension={tension ? tension : DEFAULT_TENSTION}
        orbitRadius={orbitRadius ? orbitRadius : DEFAULT_RADIUS}
        rotation={rotation ? rotation : DEFAULT_ROTATION}
        dragable={!!dragableSatellites}
        dragRadius={dragRadiusSatellites}
        orientation={satelliteOrientation}
      >
        {c}
      </Satellite>
    );
  });

  const onPlanet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else {
      if (_open && autoClose) {
        setOpen(false);
        if (onClose) {
          onClose(e);
        }
      } else {
        setOpen(true);
      }
    }
  };

  const onClickAway = (e: React.MouseEvent<Document, MouseEvent>) => {
    if (autoClose) {
      setOpen(false);
    }

    if (onClose && _open) {
      onClose(e);
    }
  };

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className={classes.root}>
        {!hideOrbit && (
          <Orbit
            open={_open}
            orbitStyle={orbitStyle}
            planetHeight={height}
            planetWidth={width}
            mass={mass ? mass : DEFAULT_MASS}
            friction={friction ? friction : DEFAULT_FRICTION}
            tension={tension ? tension : DEFAULT_TENSTION}
            orbitRadius={orbitRadius ? orbitRadius : DEFAULT_RADIUS}
          />
        )}
        <>{satellites}</>
        <div className={classes.planetContent} onClick={onPlanet}>
          <DragableContainer
            on={
              !!dragablePlanet || !!bounce || !!bounceOnOpen || !!bounceOnClose
            }
            dragable={!!dragablePlanet}
            dragRadius={dragRadiusPlanet}
            open={_open}
            bounceRadius={bounceRadius}
            bounceOnOpen={(bounce && !!!bounceOnClose) || bounceOnOpen}
            bounceOnClose={(bounce && !!!bounceOnOpen) || bounceOnClose}
            bounceDirection={bounceDirection}
          >
            <div ref={targetRef}>{centerContent}</div>
          </DragableContainer>
        </div>
      </div>
    </ClickAwayListener>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
  },

  planetContent: {
    position: "absolute",
    zIndex: 1,
  },
});
