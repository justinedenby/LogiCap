import { type ComponentProps } from 'svelte'

import andIcon from '@icons/circuits/And.webp'
import bufferIcon from '@icons/circuits/Buffer.webp'
import orIcon from '@icons/circuits/Or.webp'
import norIcon from '@icons/circuits/Nor.webp'

import xorIcon from '@icons/circuits/Xor.webp'
import xnorIcon from '@icons/circuits/Xnor.webp'
import nandIcon from '@icons/circuits/Nand.webp'
import notIcon from '@icons/circuits/Not.webp'
import outputIcon from '@icons/circuits/outputIcon.png'
import inputIcon from '@icons/circuits/inputIcon.png'

import LogicGate from '@Circuits/LogicGates/LogicGate.svelte'
import SingleIoLogic from '@Circuits/LogicGates/SingleIoLogic.svelte'
import Lamp from '@Circuits/InputOutputNodes/Lamp.svelte'
import ButtonNode from '@Circuits/InputOutputNodes/ButtonNode.svelte'

// Types that represent the different groups
// as well as each node group based off of if they are handled in the same file.
// or their grouping in the menu
export type NodeMenuGroups = 'Logic Gates' | 'Input/Output' | 'GhostElement'

export type dualInputLogicTypes = 'And' | 'Nand' | 'Or' | 'Nor' | 'Xor' | 'Xnor'
export type singleIoLogicTypes = 'Repeater' | 'Not'
export type logicGateTypes = singleIoLogicTypes | dualInputLogicTypes

export type ioNodeTypes = 'Button' | 'Lamp'
export type allNodeTypes = logicGateTypes | ioNodeTypes

// types for the structure of the menu
// this object is also used when dragging and dropping from SideMenuGroupItems.svelte
export type menuJsonElement = {
    name: string
    nodeType: allNodeTypes
    icon: string
}
type menuJsonGroupElements = Record<'groupElements', Array<menuJsonElement>>
type menuJsonItem = Record<'svg', string | undefined> & menuJsonGroupElements
export type menuJsonType = Record<NodeMenuGroups, menuJsonItem>

// all possible props for all component groups.
// a component group probably has different logic/ a different json for digitalJS
type LogicGateProps = ComponentProps<typeof LogicGate>
type OutputResultNodeProps = ComponentProps<typeof Lamp>
type ButtonInputNodeProps = ComponentProps<typeof ButtonNode>

// needed in SimNode.svelte
// So far we don't need to worry about initializing SimNode, with specific props.
// when we do we will get them from SideMenuGroupItems.svelte and then spread them in App.svelte

// I swear I suck at typescript.
// the nodes need 'nodeID' but I don't want to pass it into nodeProps on SimNode init in app.svelte.
// I want to pass it as props of SimNode and then pass it through to the component myself.
export type AllNodePropsWithoutId =
    | Omit<LogicGateProps, 'nodeId'>
    | Omit<OutputResultNodeProps, 'nodeId'>
    | Omit<ButtonInputNodeProps, 'nodeId'>

// add back in nodeId
export type AllNodeProps = AllNodePropsWithoutId & Record<'nodeId', string>

// This maybe should be just a json file but I want it to be in this folder and that is maybe problematic

//this is the labeling for the front page
export const menuJsonData: menuJsonType = {
    'Logic Gates': {
        svg: undefined,
        groupElements: [
            { name: 'And', nodeType: 'And', icon: andIcon },
            { name: 'Nand', nodeType: 'Nand', icon: nandIcon },
            { name: 'Or', nodeType: 'Or', icon: orIcon },
            { name: 'Nor', nodeType: 'Nor', icon: norIcon },
            { name: 'Xor', nodeType: 'Xor', icon: xorIcon },
            { name: 'Xnor', nodeType: 'Xnor', icon: xnorIcon },
            { name: 'Not', nodeType: 'Not', icon: notIcon },
            { name: 'Repeater', nodeType: 'Repeater', icon: bufferIcon },
        ],
    },
    'Input/Output': {
        svg: undefined,
        groupElements: [
            { name: 'Lamp', nodeType: 'Lamp', icon: outputIcon },
            { name: 'Button', nodeType: 'Button', icon: inputIcon },
        ],
    },
    GhostElement: {
        svg: undefined,
        groupElements: [],
    },
}

// This function is here as opposed to inside of SimNode.svelte
// This is in order to simplify the process of adding a new component

// 1. Add item to the menu
// 2. add the component name and type to its group in the menuJsonData
// 3. create the component
// 4. add the component prop type to AllNodeProps
// 5. add it to the switch statement below.
// If your component has specific required props: this may be an issue, lmk.
// this function is used to getComponent when dropping and create the correct component.
export function getComponent(type: allNodeTypes) {
    switch (type) {
        case 'And':
        case 'Nor':
        case 'Xor':
        case 'Xnor':
        case 'Or':
        case 'Nand':
            return LogicGate
        case 'Repeater':
        case 'Not':
            return SingleIoLogic
        case 'Button':
            return ButtonNode
        case 'Lamp':
            return Lamp
        default:
            return null
    }
}
