export default function swDev() {
  if ("serviceWorker" in navigator) {
    const base64UrlToUint8Array = (base64UrlData: string) => {
      const padding = "=".repeat((4 - (base64UrlData.length % 4)) % 4);
      const base64 = (base64UrlData + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
      const rawData = atob(base64);
      const buffer = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        buffer[i] = rawData.charCodeAt(i);
      }
      return buffer;
    };
    const determineAppServerKey = () => {
      const vapidPublicKey =
        "BBIS2GHbZG54alVh9UnrTJySOLZbkA8k_ZaSu_n8qdMj4pEQfks4Tp1UJJzwVib4UxtIhBpAMcrl5n53Ui1n34s";
      return base64UrlToUint8Array(vapidPublicKey);
    };
    console.log("service worker exist in navigator");
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker
      .register(swUrl)
      .then((response) => {
        console.log("service worker registered", { response });
        return response.pushManager.getSubscription().then((subscription) => {
          return response.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: determineAppServerKey(),
          });
        });
      })
      .catch((error) => {
        // Failed registration, service wor ker won’t be installed
        console.log(
          "Whoops. Service worker registration failed, error:",
          error
        );
      });
  } else {
    console.log("browser(navigator) doesn't support service worker");
  }
}
