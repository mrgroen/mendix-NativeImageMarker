import { PixelRatio, View, useWindowDimensions } from "react-native";
import { Image } from "mendix/components/native/Image";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

import { createElement } from "react";

export function NativeImageViewer({ imageToView, imageWidthAttr, imageHeightAttr, onCloseAction }) {
    const window = useWindowDimensions();

    if (!imageToView || imageToView.status !== "available" || !imageToView.value) {
        return null;
    }

    if (imageWidthAttr.status !== "available" || imageHeightAttr.status !== "available") {
        return null;
    }

    let imageWidth = Number(imageWidthAttr.value);
    let imageHeight = Number(imageHeightAttr.value);
    const pixelDensity = PixelRatio.get();
    imageWidth = PixelRatio.roundToNearestPixel(imageWidth / pixelDensity);
    imageHeight = PixelRatio.roundToNearestPixel(imageHeight / pixelDensity);
    let zoomRatio = 0;
    if (window.height > window.width) {
        // Portrait
        zoomRatio = window.width / imageWidth;
    } else {
        // Landscape
        zoomRatio = window.height / imageHeight;
    }

    return (
        <View style={{ flex: 1 }}>
            <ReactNativeZoomableView
                maxZoom={30}
                minZoom={zoomRatio}
                initialZoom={zoomRatio}
                contentWidth={imageWidth}
                contentHeight={imageHeight}
                onSingleTap={() => {
                    if (onCloseAction && onCloseAction.canExecute && !onCloseAction.isExecuting) {
                        onCloseAction.execute();
                    }
                }}
            >
                <Image source={imageToView.value} style={{ width: imageWidth, height: imageHeight }} />
            </ReactNativeZoomableView>
        </View>
    );
}
