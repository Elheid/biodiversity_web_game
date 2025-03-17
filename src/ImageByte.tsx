export const ImageToByte = () => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                if (!event.target?.result) return;
                
                try {
                    // Получаем байты из ArrayBuffer
                    const bytes = new Uint8Array(event.target.result as ArrayBuffer);
                    
                    // Конвертируем в HEX-строку с ведущими нулями
                    const hexString = Array.from(bytes)
                        .map(b => b.toString(16).padStart(2, '0')) // Исправлено здесь
                        .join('');
                    
                    // Формируем SQL-запрос
                    console.log(`INSERT INTO levels_first_round (level_image) VALUES ('\\\\x${hexString}');`);
                } catch (error) {
                    console.error('Error processing file:', error);
                }
            };

            reader.onerror = () => {
                console.error('Error reading file:', reader.error);
            };

            // Читаем файл как ArrayBuffer
            reader.readAsArrayBuffer(file);
        }
    };

    return <input type="file" accept=".png" onChange={onChangeHandler} />;
};