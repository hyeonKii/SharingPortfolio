export const convertToWebP = async (imgURL: string): Promise<Blob> => {
    const res = await fetch(imgURL);
    const blob = await res.blob();
    
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("failed to create canvas"));
                return;
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((webpBlob) => {
                webpBlob
                    ? resolve(webpBlob)
                    : reject(new Error("failed to convert"));
            }, "image/webp");
        };
        img.onerror = (err) => reject(err);
        img.src = URL.createObjectURL(blob);
    });
};
