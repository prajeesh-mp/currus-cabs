export function handleFileSelection(file: File, callback: (base64WithType: string) => void) {
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
        if (reader.result) {
            // Extract MIME type from the file
            const mimeType = file.type;

            // Create the base64 string with MIME type
            const base64String = reader.result.toString().split(',')[1];
            const base64WithType = `data:${mimeType};base64,${base64String}`;

            callback(base64WithType);
        } else {
            console.error('Error: Reader result is null');
        }
    };

    reader.onerror = () => {
        console.error('Error reading file');
    };

    reader.readAsDataURL(file);
}
