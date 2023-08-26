import type { Data, APIProp, ExampleHighlights, ComponentAPIExtraInfo } from "../types";

const highlights: ExampleHighlights = {
    main: {
        'app.svelte': {
            lines: ''
        }
    }
};

const apiExtraInfo: ComponentAPIExtraInfo[] = [
    {
        component: 'TOC',
        required: ['selector'],
        styles: ['labelStyles', 'contentStyles', 'activeStyles'],
        function: ['']
    }
]

export const tocData: Data = {
    highlights,
    // componentProps
    apiExtraInfo
}