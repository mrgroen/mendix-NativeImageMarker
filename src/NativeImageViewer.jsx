import { Component, createElement } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import { Modal } from "react-native";

export class NativeImageViewer extends Component {
    fileshown = false;
    render() {
        if (this.fileshown) {
            console.info("NativeImageViewer: image already shown");
            return null;
        }
        const { imageToView } = this.props;
        if (!imageToView || imageToView.status !== "available" || !imageToView.value.uri) {
            return null;
        }

        this.fileshown = true;
        console.info("NativeImageViewer, uri: " + imageToView.value.uri);
        const images = [
            {
                url: imageToView.value.uri
            }
        ];
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer imageUrls={images} />
            </Modal>
        );
    }
}
