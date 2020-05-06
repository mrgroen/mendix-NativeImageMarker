import { Component, createElement } from "react";
import { Dimensions, Modal, PixelRatio } from "react-native";
import { Image } from "mendix/components/native/Image";
import ImageZoom from "react-native-image-pan-zoom";
import { CloseButton } from "./components/CloseButton";

export class NativeImageViewer extends Component {
    state = {
        modalVisible: true
    };
    render() {
        const { imageToView, imageWidthAttr, imageHeightAttr } = this.props;
        if (!imageToView || imageToView.status !== "available" || !imageToView.value.uri) {
            return null;
        }

        let imageWidth = Number(imageWidthAttr.value);
        let imageHeight = Number(imageHeightAttr.value);
        const pixelDensity = PixelRatio.get();
        imageWidth = PixelRatio.roundToNearestPixel(imageWidth / pixelDensity);
        imageHeight = PixelRatio.roundToNearestPixel(imageHeight / pixelDensity);

        const imageStyle = [{ width: imageWidth, height: imageHeight }];
        return (
            <Modal visible={this.state.modalVisible} transparent={true}>
                <ImageZoom
                    cropWidth={Dimensions.get("window").width}
                    cropHeight={Dimensions.get("window").height}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                    enableCenterFocus={false}
                >
                    {this.renderImage(imageStyle)}
                </ImageZoom>
                <CloseButton closeButtonIcon={this.props.closeButtonIcon} onClick={() => this.onClick()}/>
            </Modal>
        );
    }

    renderImage(imageStyle) {
        if (this.state.modalVisible) {
            // console.info("NativeImageViewer render image");
            return <Image source={this.props.imageToView.value} style={imageStyle} />;
        } else {
            // console.info("NativeImageViewer skip render image because modal is not shown");
            return null;
        }
    }

    onClick() {
        // console.info("NativeImageViewer close button clicked");
        this.setState({
            modalVisible: false
        });
        const { onCloseAction } = this.props;
        if (onCloseAction && onCloseAction.canExecute && !onCloseAction.isExecuting) {
            onCloseAction.execute();
        }
    }
}
