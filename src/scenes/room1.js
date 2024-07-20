import { makePlayer } from "../entities/player.js";
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
    const positions = [];


    for (const layer of roomLayers ){
        if(layer.name === "positions"){
            positions.push(...layer.objects);
            continue;
        }
        if (layer.name === "colliders"){
            colliders.push(...layer.objects)
            continue;
        }
    }
    
    setMapColliders(k, map, colliders);

    const player = k.add(makePlayer(k));

    for (const pos of positions){
        if(pos.name === "player"){
            player.setPosition(pos.x, pos.y);
            player.setControls();
        }
    }
}