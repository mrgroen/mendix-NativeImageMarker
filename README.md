## NativeImageViewer
View images, with zoom and pan

## Features
- Shows the image full screen 
- Allows zooming and panning
- Tap image to close viewer

## Image width / height
Widget needs the image width/height. For images created in the backend, use CommunityCommons.GetImageDimensions. For images taken in the native app, the TakePicture JS action sets the dimensions on the image object. (TakePicture can return the dimensions as of version 1.1.2 of Native Mobile Resources.)

## Usage
- Place widget on a page with a full page layout.
- No other content on the page will be visible as the widget is a modal
- Configure a close action, usually just Close page is sufficient.

## In modal or directly
The widget initally always rendered the image in a modal. Mostly because rendering directly on the Mendix page did not work very well initially. As of Mendix 9, this works correctly. So now you can choose to render the image directly on the page. This allows the widget to react to device rotation. Please note that the widget assumes to show the image fullscreen, so use a fullpage layout and don't place any other content on the page. Also, take out any spacing.

## Known issue
- On the iPad device rotation does not work correctly, only portrait works well. Issue with React Native, not the widget or Mendix.
