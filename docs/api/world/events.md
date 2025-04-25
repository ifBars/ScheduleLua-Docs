# World Time Events API

ScheduleLua provides a comprehensive event system for time-related events in Schedule I. This API allows scripts to register for various time-based events and respond to them appropriately.

<div class="custom-block warning">
  <p><strong>Implementation Status:</strong> Partially implemented. Basic functionality works, but some advanced features are still in development.</p>
</div>

## Overview

The Time Events API enables scripts to:

- Register for time-based game events
- Schedule custom events to occur at specific game times
- Receive notifications about day/night transitions
- React to game calendar changes

## Event Hooks

## Curfew Events

The time events system integrates with the Curfew system. The following events are available:

### OnCurfewWarning

Called shortly before curfew begins (typically 30 minutes before).

```lua
function OnCurfewWarning()
    Log("WARNING: Curfew will begin soon!")
end
```

### OnCurfewBegin

Called when curfew begins.

```lua
function OnCurfewBegin()
    Log("NOTICE: Curfew is now in effect!")
end
```

### OnCurfewEnd

Called when curfew ends.

```lua
function OnCurfewEnd()
    Log("NOTICE: Curfew is now over.")
end
```