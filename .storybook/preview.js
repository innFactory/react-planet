import { withKnobs } from '@storybook/addon-knobs/dist';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters, configure } from '@storybook/react';

addParameters({
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
});

addDecorator(withKnobs);

configure(require.context('../src', true, /\.stories\.tsx$/), module);
