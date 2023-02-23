import React, { useRef, useState, useEffect, createElement } from "react";
import { View, Animated, Pressable } from "react-native";

export function Marker({
    marker,
    styles,
    scale,
    onMarkerPressAction
}) {
    const pressTimer = useRef(null);
    const pressLast = useRef(null);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

    // Checking input requirements, nothing to render without them.
    if (!marker || !styles || !scale) {
        return null;
    }

    // Function to handle single and double taps
    const tapHandler = (singleTap, doubleTap) => {
        const now = Date.now();
        if (!pressTimer.current) {
            // Start timer: if a second tap does not come in by the delay, trigger singleTap callback.
            pressTimer.current = setTimeout(() => {
                singleTap ? singleTap() : null;
                pressTimer.current = null;
            }, 250);
            pressLast.current = now;
        } else {
            // If pressed within span of the delay, trigger doubleTap callback.
            if (now - pressLast.current < 250) {
                pressTimer.current && clearTimeout(pressTimer.current);
                doubleTap ? doubleTap() : null;
                pressTimer.current = null;
            }
        }
    };

    return (
        <AnimatedPressable
            key={`${marker.left}x${marker.top}`}
            style={[
                styles.markerShadow,
                { left: `${marker.left}`, top: `${marker.top}` },
                { backgroundColor: `${marker.color}60` },
                { transform: [{ scale }] }
            ]}
            onPress={()=>{
                console.debug('onPress');
                if (onMarkerPressAction && marker.item) {
                    let mxAction = onMarkerPressAction.get(marker.item);
                    if (mxAction && mxAction.canExecute && !mxAction.isExecuting) {
                        mxAction.execute();
                    }
                }
            }}
            onLongPress={()=>{
                console.debug('onLongPress');
            }}
        >
            <View style={[styles.markerHeart, { backgroundColor: `${marker.color}` }]} />
        </AnimatedPressable>
    );
}