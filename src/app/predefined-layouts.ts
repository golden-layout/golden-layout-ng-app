import { ItemType, LayoutConfig, SerialisableComponentConfig } from "golden-layout";
import { BooleanComponent } from './boolean.component';
import { ColorComponent } from './color.component';
import { TextComponent } from './text.component';

export interface Layout {
    name: string;
    config: LayoutConfig;
}

const miniRowConfig: LayoutConfig = {
    root: {
        type: ItemType.row,
        content: [
            {
                type: "component",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentType: ColorComponent.name,
                width: 30,
                componentState: 'gold',
            } as SerialisableComponentConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentType: ColorComponent.name,
                componentState: undefined,
            } as SerialisableComponentConfig,
        ],
    },
};

const miniRowLayout: Layout = {
    name: 'miniRow',
    config: miniRowConfig,
};

const miniStackConfig: LayoutConfig = {
    root: {
        type: ItemType.stack,
        content: [
            {
                type: "component",
                title: "Golden",
                header: {
                    show: "top",
                },
                isClosable: false,
                componentType: ColorComponent.name,
                width: 30,
                componentState: 'white',
            } as SerialisableComponentConfig,
            {
                title: "Layout",
                header: { show: "top", popout: false },
                type: "component",
                componentType: ColorComponent.name,
                componentState: 'green',
            } as SerialisableComponentConfig,
        ],
    },
};

const miniStackLayout: Layout = {
    name: 'miniStack',
    config: miniStackConfig,
};

const standardConfig: LayoutConfig = {
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
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                header: { show: "right" },
                                isClosable: false,
                                componentType: ColorComponent.name,
                                width: 30,
                                componentState: {
                                    bg: "golden_layout_spiral.png",
                                },
                            } as SerialisableComponentConfig,
                            {
                                title: "Layout",
                                header: {
                                    show: "left",
                                    popout: false,
                                },
                                type: "component",
                                componentType: ColorComponent.name,
                                componentState: {
                                    bg: "golden_layout_text.png",
                                },
                            } as SerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as SerialisableComponentConfig,
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
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "comp 2",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "comp 3",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as SerialisableComponentConfig,
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

const responsiveConfig: LayoutConfig = {
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
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentType: ColorComponent.name,
                                width: 30,
                                componentState: 'Gold',
                            } as SerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.name,
                                componentState: 'red',
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as SerialisableComponentConfig,
                        ],
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentType: ColorComponent.name,
                componentState: 'green',
            } as SerialisableComponentConfig,
            {
                width: 20,
                type: "component",
                title: "Market",
                componentType: ColorComponent.name,
                componentState: 'white',
            } as SerialisableComponentConfig,
            {
                width: 20,
                type: "column",
                content: [
                    {
                        height: 20,
                        type: "component",
                        title: "Performance",
                        componentType: ColorComponent.name,
                    },
                    {
                        height: 80,
                        type: "component",
                        title: "Profile",
                        componentType: ColorComponent.name,
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

const tabDropdownConfig: LayoutConfig = {
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
                        componentType: TextComponent.name,
                    },
                    {
                        type: "row",
                        content: [
                            {
                                type: "component",
                                title: "Golden",
                                componentType: TextComponent.name,
                                width: 30,
                                componentState: {
                                    text: 'hello',
                                },
                            } as SerialisableComponentConfig,
                        ],
                    },
                    {
                        type: "stack",
                        content: [
                            {
                                type: "component",
                                title: "Acme, inc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock X",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "LexCorp plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Y",
                                },
                            } as SerialisableComponentConfig,
                            {
                                type: "component",
                                title: "Springshield plc.",
                                componentType: ColorComponent.name,
                                componentState: {
                                    companyName: "Stock Z",
                                },
                            } as SerialisableComponentConfig,
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
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Performance",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Trend",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Balance",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Budget",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Curve",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Standing",
                        componentType: ColorComponent.name,
                    },
                    {
                        type: "component",
                        title: "Lasting",
                        componentType: ColorComponent.name,
                        componentState: {
                            bg: "golden_layout_spiral.png",
                        },
                    } as SerialisableComponentConfig,
                    {
                        type: "component",
                        title: "Profile",
                        componentType: ColorComponent.name,
                    },
                ],
            },
            {
                width: 30,
                title: "Layout",
                type: "component",
                componentType: BooleanComponent.name,
                componentState: true,
            } as SerialisableComponentConfig,
        ],
    },
};

const tabDropdownLayout: Layout = {
    name: 'tabDropdown',
    config: tabDropdownConfig,
};

export const predefinedLayouts: readonly Layout[] = [miniRowLayout, miniStackLayout, responsiveLayout, standardLayout, tabDropdownLayout];
export const predefinedLayoutNames: readonly string[] = predefinedLayouts.map((layout) => layout.name);
