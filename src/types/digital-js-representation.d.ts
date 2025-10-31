// DIGITAL JS CircuitJson Input Types.
type Button = {
    type: "Button"
    label: string
    net: string
    order?: number
    bits: number
    position?: {
        x: number
        y: number
    },
    rotation?: number
}

type Lamp = {
    type: "Lamp"
    net: string
    order: number
    bits: number
    inputs: number
    outputs: number
    label: string
    position?: {
        x: number
        y: number
    },
    rotation?: number
}

type LogicGate = {
    type: string
    label: string
    inputs: number
    position?: {
        x: number
        y: number
    },
    rotation?: number
}

// NEW: Clock type for clock components
type Clock = {
    type: "Clock"
    label: string
    frequency: number
    position?: {
        x: number
        y: number
    },
    rotation?: number
}

// NEW: DFlipFlop type for D flip-flop components
type DFlipFlop = {
    type: "Dff"  // DigitalJS uses "Dff" as the type name
    label: string
    bits: number
    trigger: 'rising' | 'falling'
    position?: {
        x: number
        y: number
    },
    rotation?: number
}

// UPDATE: Add Clock and DFlipFlop to the Device union type
type Device = Button | Lamp | LogicGate | Clock | DFlipFlop
type Devices = Record<string, Device>

// DIGITALJS link node connection types

// id coorisponds to the device uuid/nodeName/nodeId. This is also the key in the DeviceRecord type
// port, I do not fully understand, but it's working via a bit of logic in SimulationNodeAnchor
type LinkData = {
    id: string
    port: string
}


// We need some way to transform digital js json representation into this, for loading in pre-existing circuits.
// connections: svelvet type
// Array<[nodeId, anchorId] | nodeId>default:"[]"
// Used to specify Node connections ahead of time. Array of tuples representing a
// node/anchor pair or of nodeIds themselves. IDs can be strings or numbers. When
// specifying nodeIds only, connections are spread evenly across the input anchors
// of the target.

type ConnectorFrom = Record<'from', LinkData>
type ConnectorTo = Record<'to', LinkData>
type ConnectorPiece = ConnectorTo | ConnectorFrom
type ConnectorName = Record<'name', string>

type Connector = ConnectorFrom & ConnectorTo & ConnectorName


// DIGITALJS Subcircuit Type
type Subcircuit = {
    devices: Devices
    connectors: Connector[]
}


type GateType = string
type UUID = string

// this key will kinda 
type outputAnchorName = `out_${GateType}_${UUID}`
type inputGateName = `${GateType}_${UUID}`
type inputIdentifier = `in${number}` | `in`
type inputAnchorName = `${inputIdentifier}_${GateType}_${UUID}`

type ConnectionTuple = [inputGateName, inputAnchorName]
type ConnectionList = Array<ConnectionTuple>
// DIGITAL JS Circuit Input Json Type
// Device manifest
// Connection manifest
type WireType = string
type SvelvetConnectors = Record<outputAnchorName, ConnectionList>
type Circuit = {
    devices: Devices
    connectors: SvelvetConnectors
    subcircuits: Record<string, Subcircuit>
    wireManipulations: Record<string, WireType>
}

type DefaultCircuit = {
    devices: Devices
    connectors: Connector[]
    subcircuits: Record<string, Subcircuit>
}
