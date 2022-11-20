import { Image } from "mendix/components/native/Image";

import { createElement } from "react";

export function MendixImage({ imageToView, imageWidth, imageHeight }) {
    return <Image source={imageToView.value} style={{ width: imageWidth, height: imageHeight }} />;
}
