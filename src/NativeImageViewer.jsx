import { PixelRatio, View, useWindowDimensions } from "react-native";
import { MendixImage } from "./components/MendixImage";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { UrlImage } from "./components/UrlImage";

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
    // Calculate the smallest zoom ratio and use that for the image zoom ratio.
    const zoomRatioWidth = window.width / imageWidth;
    const zoomRatioHeight = window.height / imageHeight;
    const zoomRatio = zoomRatioHeight < zoomRatioWidth ? zoomRatioHeight : zoomRatioWidth;

    const renderImage = () => {
        switch (imageSource) {
            case "mendixImage":
                return <MendixImage imageToView={imageToView} imageWidth={imageWidth} imageHeight={imageHeight} />;

            case "url":
                return <UrlImage uri={imageUrl.value} imageWidth={imageWidth} imageHeight={imageHeight} />;

            default:
                return null;
        }
    };

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
                {renderImage()}
            </ReactNativeZoomableView>
        </View>
    );
}
