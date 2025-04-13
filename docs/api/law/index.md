# Law API

The Law API provides functions for interacting with the law enforcement and legal systems in Schedule 1. This includes curfew management, crime reporting, and police response.

<div class="custom-block tip">
  <p><strong>Implementation Status:</strong> Partially implemented. Curfew functionality is available, but other features are still in development.</p>
</div>

## Overview

The Law API allows mod scripts to:

- Get information about the current legal status of areas and activities
- Monitor and respond to crime events
- Interact with the curfew system
- Create custom law enforcement scenarios

## Available Functions

- [Curfew Management](./curfew.md) - Functions related to the city curfew system

## Planned Features

- Police response system
- Crime reporting and tracking
- Legal status of player activities
- Custom law enforcement scenarios
- Legal consequences system

## Example Usage

```lua
-- Monitor curfew status
function Update()
    local isCurfewActive = IsCurfewActive()
    if isCurfewActive then
        -- Do something during curfew
        ShowNotification("Curfew is currently active! Stay inside or hide.")
    end
}

-- Register a callback for when curfew status changes
RegisterCurfewChangeCallback(function(isActive)
    if isActive then
        ShowNotification("WARNING: Curfew has begun!")
    else
        ShowNotification("Curfew has ended.")
    end
end)
```

## Notes

- The Law API is designed to work with the NPC and Player APIs
- It provides a way to create custom gameplay scenarios involving law enforcement
- Curfew functionality is fully implemented and ready to use
- Future updates will expand the capabilities of this API 