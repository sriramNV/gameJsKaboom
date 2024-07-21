export function setBackgroundColor(k, hexColorCode){
    k.add([
        k.rect(k.width(), k.height()),
        k.color(k.Color.fromHex(hexColorCode)),
        k.fixed(),
    ]);
}

export function setMapColliders(k,map, colliders){
    for(const collider of colliders){
        if(collider.polygon){
            const coordinate = [];
            for(const point of collider.polygon){
                coordinate.push(k.vec2(point.x, point.y));
            }


            map.add([
                k.pos(collider.x,collider.y),
                k.area({
                    shape: new k.Polygon(coordinate),
                    collisionIgnore: ["collider"],
                }),
                "collider",
                collider.type,
            ]);
            continue;
        }
        if(collider.name === "boss-barrier"){
            // const bossBarrier = map.add([]);
            continue;
        }
        map.add([
            k.pos(collider.x,collider.y),
            k.area({
                shape: new k.Rect(k.vec2(0), collider.width, collider.height),
                collisionIgnore: ["collider"],
            }),
            k.body({
                isStatic : true,
            }),
            "collider",
            collider.type,
        ])
        
    }
}


export function setCameraControls(k, player, map, roomData){

}

export function setCameraZones(k, map, cameras){
    for (const camera of cameras){
        const cameraZone = map.add([
            k.area({
                shape: new k.Rect(k.vec2(0), camera.width, camera.height),
                collisionIgnore: ["collider"],
            }),
            k.pos(camera.x, camera.y),
        ]);

        camera.onCollide("player",()=>{
            if(k.camPos().x !== camera.properties[0].value){
                k.tween(
                    k.camPos().y,
                    camera.properties[0].value,
                    0.8,
                    (val) => k.camPos(k.camPos().x,val),
                    k.easings.linear
                );
            }
        });
    }
}