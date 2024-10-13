// to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result?.toString() ?? "";
            resolve(base64);
        };
        reader.onerror = (error) => reject(error);
    });
};
//to format bytes to shorter
export function formatBytes(bytes:number, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    // const k = 1024 binay
    const k = 1000
    const dm = decimals < 0 ? 0 : decimals
    // const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}