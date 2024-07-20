import { setBackgroundColor, setMapColliders } from "./roomUtils.js";

export function room1(k, roomData){
    setBackgroundColor(k,"#a2aed5");

    k.camScale(4);
    k.camPos(170,100);
    k.setGravity(1000);

    const roomLayers = roomData.layers;

    const map = k.add([
        k.pos(0,0),
        k.sprite("room1")
    ]);

    const colliders = [];
    for (const layer of roomLayers ){
        if (layer.name === "colliders"){
            colliders.push(...layer.objects)
            break;
        }
    }
    
    setMapColliders(k, map, colliders);
}