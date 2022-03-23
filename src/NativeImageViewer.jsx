import { PixelRatio, View } from "react-native";
import { Image } from "mendix/components/native/Image";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

import { createElement } from "react";

export function NativeImageViewer({ imageToView, imageWidthAttr, imageHeightAttr, onCloseAction }) {
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

    return (
        <View style={{ flex: 1 }}>
            <ReactNativeZoomableView
                maxZoom={30}
                minZoom={0.1}
                initialZoom={0.5}
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
