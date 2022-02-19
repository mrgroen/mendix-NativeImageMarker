/**
 * This file was generated from NativeImageViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, DynamicValue, EditableValue, NativeImage } from "mendix";

export interface NativeImageViewerProps<Style> {
    name: string;
    style: Style[];
    imageToView: DynamicValue<NativeImage>;
    imageWidthAttr: EditableValue<BigJs.Big>;
    imageHeightAttr: EditableValue<BigJs.Big>;
    showModal: boolean;
    onCloseAction?: ActionValue;
}

export interface NativeImageViewerPreviewProps {
    class: string;
    style: string;
    imageToView: string;
    imageWidthAttr: string;
    imageHeightAttr: string;
    showModal: boolean;
    onCloseAction: {} | null;
}
