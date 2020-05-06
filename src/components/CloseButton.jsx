import { Component, createElement } from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { Icon } from "mendix/components/native/Icon";

const ZINDEX = Platform.OS === "ios" ? "zIndex" : "elevation";

export class CloseButton extends Component {

    defaultIconGlyph = "glyphicon-remove";

    render() {
        const headerStyle = [{
            position: "absolute",
            top: 20,
            right: 10,
            padding:5,
            opacity: 0.4,
            backgroundColor: "grey"
        }];
        headerStyle[ZINDEX] = 1000;
        const isAndroid = Platform.OS === "android";
        if (isAndroid) {
            return (
                <View style={headerStyle}>
                    <TouchableNativeFeedback onPress={() => this.onClick()}>
                        {this.renderIcon(this.defaultIconGlyph, this.props.closeButtonIcon)}
                    </TouchableNativeFeedback>
                </View>
            );
        } else {
            return (
                <View style={headerStyle}>
                    <TouchableOpacity onPress={() => this.onClick()}>
                        {this.renderIcon(this.defaultIconGlyph, this.props.closeButtonIcon)}
                    </TouchableOpacity>
                </View>
            );
        }
    }

    onClick() {
        this.props.onClick();
    }

    renderIcon = (glyph, toBeRenderedIcon) => {
        const nativeIcon =
            toBeRenderedIcon && toBeRenderedIcon.status === "available"
                ? toBeRenderedIcon.value
                : { type: "glyph", iconClass: glyph };
        
        return (
            <Icon color={"#FFF"} icon={nativeIcon} size={24} />
        );
    };
}
