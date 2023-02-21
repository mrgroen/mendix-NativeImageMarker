import React, { useRef, useState, useEffect, createElement, Fragment } from "react";
import { StyleSheet, PixelRatio, View, Animated, Image } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { Marker } from "./components/Marker";

export function NativeImageMarker({
    imageSource,
    imageToView,
    imageUrl,
    imageWidthAttr,
    imageHeightAttr,
    markerDatasource,
    markerLeftAttr,
    markerTopAttr,
    markerColorAttr,
    markerEditable,
    onMarkerPressAction,
    newMarkerLeftAttr,
    newMarkerTopAttr,
    newMarkerAction
}) {
    const [imageSize, setImageSize] = useState({ width: 100, height: 100 }); // default to get things started
    const [containerSize, setContainerSize] = useState({ width: 100, height: 100 }); // default to get things started
    const [viewDimension, setViewDimension] = useState({ width: 100, height: 100 }); // default to get things started
    const [markers, setMarkers] = useState(null);
    const zoomableViewRef = useRef(null);
    const imageRef = useRef(null);
    const zoomAnimatedValue = useRef(null);
    if (zoomAnimatedValue.current === null) {
        zoomAnimatedValue.current = new Animated.Value(1);
    }
    const scale = Animated.divide(1, zoomAnimatedValue.current);
    const pixelDensity = PixelRatio.get();

    // Hook to calculate and set the correct sizes.
    useEffect(() => {
        let width = imageWidthAttr && !isNaN(imageWidthAttr.value) ? imageWidthAttr.value : imageSize.width;
        let height = imageHeightAttr && !isNaN(imageHeightAttr.value) ? imageHeightAttr.value : imageSize.height;
        let newWidth = PixelRatio.roundToNearestPixel(width / pixelDensity);
        let newHeight = PixelRatio.roundToNearestPixel(height / pixelDensity);
        const widthRatio = containerSize.width / newWidth;
        const HeightRatio = containerSize.height / newHeight;
        if (newWidth > containerSize.width) {
            newWidth *= widthRatio;
            newHeight *= widthRatio;
        }
        if (newHeight > containerSize.height) {
            newWidth *= HeightRatio;
            newHeight *= HeightRatio;
        }
        setViewDimension({ 'width': newWidth, 'height': newHeight });
    }, [containerSize, imageSize]);

    // Hook to load the markers.
    useEffect(() => {
        if (markerDatasource) {
            if (markerDatasource.status !== "available") return;
            let testMarkers = [];
            markerDatasource.items?.map((item) => {
                let left = markerLeftAttr.get(item).value;
                let top = markerTopAttr.get(item).value;
                let color = markerColorAttr.get(item).value;
                testMarkers.push({ 'item': item, 'left': `${left}%`, 'top': `${top}%`, 'color': `${color}` });
            });
            setMarkers(testMarkers);
        }
    }, [markerDatasource]);

    // Checking input requirements, nothing to render without them.
    switch (imageSource) {
        case "mendixImage":
            if (!imageToView || imageToView.status !== "available" || !imageToView.value) {
                return null;
            }
            break;

        case "url":
            if (!imageUrl || imageUrl.status !== "available" || !imageUrl.value) {
                return null;
            }
            break;

        default: return null;
    }

    // Store container sizes in state.
    const onLayoutLogic = (event) => {
        setContainerSize({
            'width': event.nativeEvent.layout.width,
            'height': event.nativeEvent.layout.height
        });
    };

    // Function to render all markers.
    const renderMarkers = () => {
        return (
            <Fragment>
                {
                    markers && markers.map((marker) => (
                        <Marker marker={marker} styles={styles} scale={scale} onMarkerPressAction={onMarkerPressAction} />
                    ))
                }
            </Fragment>
        )
    };

    return (
        <View style={styles.container} onLayout={onLayoutLogic} collapsable={false}>

            <ReactNativeZoomableView
                ref={zoomableViewRef}
                zoomEnabled={true}
                initialZoom={1}
                maxZoom={30}
                minZoom={0.75}
                zoomStep={0.5}
                contentWidth={viewDimension.width ? viewDimension.width : undefined}
                contentHeight={viewDimension.height ? viewDimension.height : undefined}
                onSingleTap={(event) => {
                    if (newMarkerLeftAttr && newMarkerTopAttr) {
                        if (newMarkerLeftAttr.status !== "available") return;
                        if (newMarkerTopAttr.status !== "available") return;
                        let left = (event.nativeEvent.locationX / viewDimension.width) * 100;
                        let top = (event.nativeEvent.locationY / viewDimension.height) * 100;
                        newMarkerLeftAttr.setValue(`${left}`);
                        newMarkerTopAttr.setValue(`${top}`);
                        if (newMarkerAction && newMarkerAction.canExecute && !newMarkerAction.isExecuting) {
                            newMarkerAction.execute();
                        }
                    }
                }}
                panBoundaryPadding={0}
                visualTouchFeedbackEnabled={false}
                zoomAnimatedValue={zoomAnimatedValue.current}>

                <View style={viewDimension} collapsable={false}>

                    <Image
                        ref={imageRef}
                        source={imageSource.Value == 'url' ? imageUrl.value : imageToView.value}
                        onLoad={({ nativeEvent: { source: { width, height } } }) => setImageSize({ width, height })}
                        style={styles.img} />

                    {renderMarkers()}

                </View>

            </ReactNativeZoomableView >

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contents: {
        flex: 1,
        alignSelf: 'stretch'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    markerHeart: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 32,
        height: 32,
        marginLeft: -16,
        marginTop: -16,
        borderRadius: 16,
        backgroundColor: '#516DFF'
    },
    markerShadow: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 60,
        height: 60,
        marginLeft: -30,
        marginTop: -30,
        borderRadius: 30,
        backgroundColor: '#516DFF60'
    }
});