import { ItemConfig, UserLayoutConfig, UserSerialisableComponentConfig } from "golden-layout";
import { BooleanComponent } from './boolean.component';
import { ColorComponent } from './color.component';
import { TextComponent } from './text.component';

export interface Layout {
    name: string;
    config: UserLayoutConfig;
}

const miniRowConfig: UserLayoutConfig = {
    root: {
        type: ItemConfig.Type.row,
        content: [
            {
                type: "component",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentName: ColorComponent.name,
                width: 30,
                componentState: 'gold',
            } as UserSerialisableComponentConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentName: ColorComponent.name,
                componentState: undefined,
            } as UserSerialisableComponentConfig,
        ],
    },
};

const miniRowLayout: Layout = {
    name: 'miniRow',
    config: miniRowConfig,
};

const miniStackConfig: UserLayoutConfig = {
    root: {
        type: ItemConfig.Type.stack,
        content: [
            {
                type: "component",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentName: ColorComponent.name,
                width: 30,
                componentState: 'white',
            } as UserSerialisableComponentConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentName: ColorComponent.name,
                componentState: 'green',
            } as UserSerialisableComponentConfig,
        ],
    },
};

const miniStackLayout: Layout = {
    name: 'miniStack',
    config: miniStackConfig,
};

const standardConfig: UserLayoutConfig = {
    root: {
        type: "row",
        content: [
            {
                width: 80,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        header: { show: "bottom" },
                        type: "component",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                header: { show: "right" },
                                isClosable: false,
                                componentName: ColorComponent.name,
                                width: 30,
                                componentState: {
                                    bg: "golden_layout_spiral.png",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                title: "Layout",
                                header: {
                                    show: "left",
                                    popout: false,
                                },
                                type: "component",
                                componentName: ColorComponent.name,
                                componentState: {
                                    bg: "golden_layout_text.png",
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                ],
            },
            {
                width: 50,
                type: "row",
                title: "test stack",
                content: [
                    {
                        type: "stack",
                        title: "test row",
                        content: [
                            {
                                type: "component",
                                title: "comp 1",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "comp 2",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "comp 3",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                ],
            },
        ],
    },
};

const standardLayout: Layout = {
    name: 'standard',
    config: standardConfig,
};

const responsiveConfig: UserLayoutConfig = {
    settings: {
        responsiveMode: "always",
    },
    dimensions: {
        minItemWidth: 250,
    },
    root: {
        type: "row",
        content: [
            {
                width: 30,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        type: "component",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentName: ColorComponent.name,
                                width: 30,
                                componentState: 'Gold',
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentName: ColorComponent.name,
                                componentState: 'red',
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentName: ColorComponent.name,
                componentState: 'green',
            } as UserSerialisableComponentConfig,
            {
                width: 20,
                type: "component",
                title: "Market",
                componentName: ColorComponent.name,
                componentState: 'white',
            } as UserSerialisableComponentConfig,
            {
                width: 20,
                type: "column",
                content: [
                    {
                        height: 20,
                        type: "component",
                        title: "Performance",
                        componentName: ColorComponent.name,
                    },
                    {
                        height: 80,
                        type: "component",
                        title: "Profile",
                        componentName: ColorComponent.name,
                    },
                ],
            },
        ],
    },
};

const responsiveLayout: Layout = {
    name: 'responsive',
    config: responsiveConfig,
};

const tabDropdownConfig: UserLayoutConfig = {
    settings: {
        tabOverlapAllowance: 25,
        reorderOnTabMenuClick: false,
        tabControlOffset: 5,
    },
    root: {
        type: "row",
        content: [
            {
                width: 30,
                type: "column",
                content: [
                    {
                        title: "Fnts 100",
                        type: "component",
                        componentName: TextComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentName: TextComponent.name,
                                width: 30,
                                componentState: {
                                    text: 'hello',
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as UserSerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentName: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as UserSerialisableComponentConfig,
                        ],
                    },
                ],
            },
            {
                width: 20,
                type: "stack",
                content: [
                    {
                        type: "component",
                        title: "Market",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Performance",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Trend",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Balance",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Budget",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Curve",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Standing",
                        componentName: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Lasting",
                        componentName: ColorComponent.name,
                        componentState: {
                            bg: "golden_layout_spiral.png",
                        },
                    } as UserSerialisableComponentConfig,
                    {
                        type: "component",
                        title: "Profile",
                        componentName: ColorComponent.name,
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentName: BooleanComponent.name,
                componentState: true,
            } as UserSerialisableComponentConfig,
        ],
    },
};

const tabDropdownLayout: Layout = {
    name: 'tabDropdown',
    config: tabDropdownConfig,
};

export interface PredefinedLayouts {
    colorComponentCompatible: Layout[];
    allComponents: Layout[];
}

export const prefinedLayouts = [miniRowLayout, miniStackLayout, responsiveLayout, standardLayout, tabDropdownLayout];

