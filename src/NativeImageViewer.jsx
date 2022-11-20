import { /* Image,*/ PixelRatio, View, useWindowDimensions } from "react-native";
import { Image /* as MendixImage*/ } from "mendix/components/native/Image";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

import { createElement } from "react";

export function NativeImageViewer({
    imageSource,
    imageToView,
    imageUrl,
    imageWidthAttr,
    imageHeightAttr,
    onCloseAction
}) {
    const window = useWindowDimensions();

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

        default:
    }

    if (!imageWidthAttr.value || !imageHeightAttr.value) {
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

    // const renderImage = () => {
    //     switch (imageSource) {
    //         case "mendixImage":
    //             return <MendixImage source={imageToView.value} style={{ width: imageWidth, height: imageHeight }} />;

    //         case "url":
    //             return <Image source={{ uri: imageUrl.value }} style={{ width: imageWidth, height: imageHeight }} />;

    //         default:
    //             return null;
    //     }
    // };

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
