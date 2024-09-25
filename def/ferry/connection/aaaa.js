const fs = require("fs");
const path = require("path");

// Получаем имя текущего файла
const currentFileName = path.basename(__filename);

// Функция для обработки файлов
const processFiles = () => {
  // Читаем файлы в текущей папке
  fs.readdir(".", (err, files) => {
    if (err) {
      console.error("Ошибка чтения директории:", err);
      return;
    }

    files.forEach((file) => {
      // Игнорируем текущий файл
      if (
        file === currentFileName ||
        !file.endsWith(".sii") ||
        !file.endsWith(".sui")
      ) {
        return; // игнорируем, если это текущий файл или не текстовый файл
      }

      // Читаем файл
      fs.readFile(file, "utf8", (err, data) => {
        if (err) {
          console.error(`Ошибка чтения файла ${file}:`, err);
          return;
        }

        // Ищем строку с price
        const priceRegex = /price:\s*(\d+)/;
        const match = data.match(priceRegex);

        if (match) {
          // Получаем текущее значение price
          const currentPrice = parseInt(match[1], 10);
          const newPrice = currentPrice * 10;

          // Заменяем старое значение на новое
          const newData = data.replace(priceRegex, `price: ${newPrice}`);

          // Сохраняем обновленный файл
          fs.writeFile(file, newData, "utf8", (err) => {
            if (err) {
              console.error(`Ошибка записи файла ${file}:`, err);
            } else {
              console.log(
                `Обновлен файл ${file}: цена изменена с ${currentPrice} на ${newPrice}`,
              );
            }
          });
        } else {
          console.log(`В файле ${file} не найден price. Игнорируется.`);
        }
      });
    });
  });
};

// Запускаем процесс
processFiles();
