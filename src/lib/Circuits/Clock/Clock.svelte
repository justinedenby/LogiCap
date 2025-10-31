<script lang="ts">
    let { nodeId = '' } = $props()
    
    import { get } from 'svelte/store'
    import { Vector3vl } from '3vl'
    
    // Import the anchor system
    import Anchor from '../../CircuitParts/Anchor.svelte'
    
    let currentState = $state(false)
    
    function toggleClock() {
        currentState = !currentState
        console.log(`⏰ Manual clock ${nodeId} toggled to: ${currentState ? 'HIGH' : 'LOW'}`)
        
        // The actual signal will be handled by the anchor/wire system
        // The anchor will propagate the signal to connected components
    }
</script>

<div class="clock-component" class:high={currentState} role="button" tabindex="0" 
     onclick={toggleClock} onkeydown={(e) => e.key === 'Enter' && toggleClock()}>
    <div class="clock-header">
        <span class="label">Manual Clock</span>
    </div>
    <div class="clock-display">
        <div class="clock-face {currentState ? 'high' : 'low'}">
            {currentState ? '🟥 HIGH' : '⬛ LOW'}
        </div>
        <div class="hint">Click to toggle</div>
    </div>
    
    <!-- ADD OUTPUT ANCHOR so the clock can connect to other components -->
    <div class="anchor-container output-anchor">
        <Anchor 
            nodeId={nodeId}
            anchorType="out" 
            anchorId="out" 
            signal={currentState ? 1 : 0}
        />
    </div>
</div>

<style>
    .clock-component {
        border: 2px solid #333;
        border-radius: 8px;
        padding: 8px;
        background: #f9f9f9;
        min-width: 100px;
        cursor: pointer;
        outline: none;
        position: relative; /* Needed for anchor positioning */
    }
    
    .clock-component:focus {
        box-shadow: 0 0 0 2px #4CAF50;
    }
    
    .clock-component.high {
        border-color: #4CAF50;
        background: #e8f5e8;
    }
    
    .clock-display {
        text-align: center;
        margin-bottom: 8px; /* Space for anchor */
    }
    
    .clock-face {
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 4px;
    }
    
    .hint {
        font-size: 0.7em;
        color: #666;
    }
    
    /* Anchor positioning */
    .anchor-container {
        position: absolute;
        bottom: -8px; /* Position below the component */
    }
    
    .output-anchor {
        left: 50%;
        transform: translateX(-50%);
    }
</style>