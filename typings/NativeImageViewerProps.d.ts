/**
 * This file was generated from NativeImageViewer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue, NativeImage } from "mendix";
import { Big } from "big.js";

export interface NativeImageViewerProps<Style> {
    name: string;
    style: Style[];
    imageToView: DynamicValue<NativeImage>;
    imageWidthAttr: EditableValue<Big>;
    imageHeightAttr: EditableValue<Big>;
    showModal: boolean;
    onCloseAction?: ActionValue;
}

export interface NativeImageViewerPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    imageToView: { type: "static"; imageUrl: string; } | { type: "dynamic"; entity: string; } | null;
    imageWidthAttr: string;
    imageHeightAttr: string;
    showModal: boolean;
    onCloseAction: {} | null;
}
