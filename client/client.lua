local InProcess = false

function openGui(time)
    SetNuiFocus(true, false)
    SendNUIMessage({type = "open", time = time})
end
  
RegisterNUICallback('fail', function(data, cb)
    closeMenu("fail")
end)

RegisterNUICallback('success', function(data, cb)
    closeMenu("success")
end)

function closeMenu(type)
    SetNuiFocus(false, false)
    status = type
    InProcess = false
end

function StartBar(time)
    if InProcess then return end
    InProcess = true
    openGui(time)
    while InProcess do 
        local ped = PlayerPedId()
        if IsPedRagdoll(ped) or IsPedBeingStunned(ped) and not IsEntityDead(ped) then 
            SetNuiFocus(false, false)
            SendNUIMessage({type = "close"})
            InProcess = false
            return false
        end
        Citizen.Wait(0) 
    end
    Citizen.Wait(200)
    if status == "success" then
        return true
    else
        return false
    end
end