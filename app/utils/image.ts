export function handleFileSelection(file: File, callback: (base64: string) => void) {
    const MAX_SIZE = 500 * 1024; // 500KB in bytes

    if (!file) {
        console.error('No file selected');
        return;
    }

    if (file.size > MAX_SIZE) {
        console.error('File size exceeds the maximum limit of 500KB');
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        // @ts-expect-error base64 conversion
        const base64String = reader?.result?.split(',')[1];
        callback(base64String);
    };

    reader.onerror = () => {
        console.error('Error reading file');
    };

    reader.readAsDataURL(file);
}
