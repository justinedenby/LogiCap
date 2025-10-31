// These functions should use eachother.
//
// export a function map from this function, then depending on the type, create this json in app.svelte
function makeLamp(
    nodeName: string,
    options?: {
        bits: number
        net: string
        label: string
        order: number
        inputs: number
        outputs: number
        position?: { x: number; y: number }
        rotation?: number
    }
): Lamp {
    return {
        type: 'Lamp',
        net: nodeName,
        inputs: options?.inputs || 1,
        outputs: options?.outputs || 0,
        order: options?.order || 0,
        bits: options?.bits || 1,
        label: options?.label || nodeName,
        ...(options?.position && {
            position: {
                x: options.position.x,
                y: options.position.y,
            },
        }),
        ...(options?.rotation && {
            rotation: options.rotation
        }),
    }
}

function makeButton(
    nodeName: string,
    options?: {
        bits?: number
        net?: string
        label?: string
        position?: { x: number; y: number }
        rotation?: number
    }
): Button {
    return {
        type: 'Button',
        label: options?.label || nodeName,
        net: options?.net || nodeName,
        bits: options?.bits || 1,
        ...(options?.position && {
            position: {
                x: options.position.x,
                y: options.position.y,
            },
        }),
        ...(options?.rotation && {
            rotation: options.rotation
        }),
    }
}

function makeLogicNode(
    type: string,
    nodeName: string,
    options?: { position?: { x: number; y: number }, rotation?: number }
): LogicGate {
    return {
        type,
        label: nodeName,
        inputs: 2,
        ...(options?.position && {
            position: {
                x: options.position.x,
                y: options.position.y,
            },
            ...(options?.rotation && {
                rotation: options.rotation
            }),
        }),
    }
}

// NEW: Clock factory function
function makeClock(
    nodeName: string,
    options?: {
        frequency?: number
        position?: { x: number; y: number }
        rotation?: number
    }
): Clock {
    return {
        type: 'Clock', // DigitalJS has native Clock type!
        label: nodeName,
        frequency: options?.frequency || 1,
        ...(options?.position && {
            position: {
                x: options.position.x,
                y: options.position.y,
            },
        }),
        ...(options?.rotation && {
            rotation: options.rotation
        }),
    }
}

// NEW: D Flip-Flop factory function
function makeDFlipFlop(
    nodeName: string,
    options?: {
        position?: { x: number; y: number }
        rotation?: number
        bits?: number
        trigger?: 'rising' | 'falling'
    }
): DFlipFlop {
    return {
        type: 'Dff', // DigitalJS uses 'Dff' (exact spelling)
        label: nodeName,
        bits: options?.bits || 1,
        trigger: options?.trigger || 'rising',
        ...(options?.position && {
            position: {
                x: options.position.x,
                y: options.position.y,
            },
        }),
        ...(options?.rotation && {
            rotation: options.rotation
        }),
    }
}
export const deviceJsonFactoryMap: Record<
    string,
    (nodeName: string, options?: any) => Device
> = {
    Button: makeButton,
    Lamp: makeLamp,
    And: (nodeName, options?) =>
        makeLogicNode('And', nodeName, ...(options ? [options] : [])),
    Nand: (nodeName, options?) =>
        makeLogicNode('Nand', nodeName, ...(options ? [options] : [])),
    Or: (nodeName, options?) =>
        makeLogicNode('Or', nodeName, ...(options ? [options] : [])),
    Nor: (nodeName, options?) =>
        makeLogicNode('Nor', nodeName, ...(options ? [options] : [])),
    Xor: (nodeName, options?) =>
        makeLogicNode('Xor', nodeName, ...(options ? [options] : [])),
    Xnor: (nodeName, options?) =>
        makeLogicNode('Xnor', nodeName, ...(options ? [options] : [])),
    Not: (nodeName, options?) =>
        makeLogicNode('Not', nodeName, ...(options ? [options] : [])),
    Repeater: (nodeName, options?) =>
        makeLogicNode('Repeater', nodeName, ...(options ? [options] : [])),
    Clock: makeClock,
    DFlipFlop: makeDFlipFlop,
}

// // Example usage
// const defaultAnd = deviceFactoryMap["And"]("andGate");
// const defaultButton = deviceFactoryMap["Button"]("button1");
// const defaultLamp = deviceFactoryMap["Lamp"]("lamp1");
