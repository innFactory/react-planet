import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import * as React from 'react';
import { scale } from './storybook_utils.tsx/utils';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#5593e6',
			main: '#0066B3',
			dark: '#003c83',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff983f',
			main: '#FF6600',
			dark: '#c43300',
			contrastText: '#fff',
		},
	},
	typography: {
		fontSize: scale(14, 11, 14),
	},
});
export const withTheme = (component: any) => {
	return (
		<ThemeProvider theme={theme}>
			{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			{component}
		</ThemeProvider>
	);
};
