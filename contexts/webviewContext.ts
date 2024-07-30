import { createContext } from "react";
import WebView from "react-native-webview";

const WebViewContext = createContext<WebView | null>(null);

export default WebViewContext;
