<script lang="ts">
    let { nodeId = '', bits = 1, trigger = 'rising' } = $props()
</script>

<div class="d-flip-flop">
    <div class="component-header">
        <span class="label">D Flip-Flop</span>
        {#if bits > 1}
            <span class="bit-count">[{bits}]</span>
        {/if}
    </div>
    <div class="pins">
        <div class="pin-group inputs">
            <div class="pin data" title="Data input">D</div>
            <div class="pin clock" title="Clock input ({trigger} edge)">CLK {trigger === 'rising' ? '↗' : '↘'}</div>
            <div class="pin reset" title="Reset">R</div>
            <div class="pin preset" title="Preset">S</div>
        </div>
        <div class="pin-group outputs">
            <div class="pin output" title="Output">Q</div>
            <div class="pin output-not" title="Complement output">Q'</div>
        </div>
    </div>
</div>

<style>
    .d-flip-flop {
        border: 2px solid #333;
        border-radius: 6px;
        padding: 8px;
        background: #f9f9f9;
        min-width: 140px;
        font-family: monospace;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .component-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 0.8em;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        padding-bottom: 4px;
    }
    
    .bit-count {
        font-size: 0.7em;
        color: #666;
        background: #eee;
        padding: 1px 4px;
        border-radius: 3px;
    }
    
    .pins {
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }
    
    .pin-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .pin {
        padding: 2px 6px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 0.7em;
        text-align: center;
        background: white;
        min-width: 20px;
    }
    
    .pin.clock {
        background: #fff3cd;
        border-color: #ffc107;
        font-weight: bold;
    }
    
    .pin.data {
        background: #e7f3ff;
        border-color: #0d6efd;
    }
    
    .pin.reset, .pin.preset {
        background: #f8d7da;
        border-color: #dc3545;
        font-size: 0.65em;
    }
    
    .pin.output, .pin.output-not {
        background: #d1e7dd;
        border-color: #198754;
    }
</style>
