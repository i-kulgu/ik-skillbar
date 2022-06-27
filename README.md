# ik-skillbar

( For any help you can reach us at Discord: [Hi-Dev](https://discord.com/invite/pSJPPctrNx) )

![unknown](https://user-images.githubusercontent.com/29943243/175839310-5c4c663c-f827-407c-ac7a-5b61ec75fe78.png)

**exports**
```lua
exports["ik-skillbar"]:StartBar(time)
```
**Example Usage**
```lua
local game1 = exports["ik-skillbar"]:StartBar(8000)
if not game1 then
    finished = false
else
    local game2 = exports["ik-skillbar"]:StartBar(4000)
    if not game2 then
        finished = false
    else
        local game3 = exports["ik-skillbar"]:StartBar(2000)
        if not game3 then
            finished = false
        else
            finished = true
        end
    end
end
```

This is an edited version of ![tgiann-skillbar](https://github.com/TGIANN/fivem-tgiann-skillbar)
