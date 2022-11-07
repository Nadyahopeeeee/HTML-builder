//Импорт всех требуемых модулей
const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

// Создание потока записи в текстовый файл???
fs.open(path.join(__dirname, 'destination.txt'), 'w', () => {});

// Вывод в консоль приветственного сообщения
stdout.write('Добрейшего вечерочка! Введите текст в консоль.\n');

// Ожидание ввода текста пользователем, с проверкой ввода на наличие ключевого слова exit
stdin.on('data', data => {
    if (data.toString().trim() == 'exit') {
        process.exit();
    }
    //Запись текста в файл
    fs.appendFile(path.join(__dirname, 'destination.txt'), data.toString(), () => {});
    //Ожидание дальнейшего ввода
    stdout.write('Снова введите текст в консоль.\n');
})

//Реализация прощального сообщения при остановке процесса
process.on('exit' || 'SIGINT', () => {
    stdout.write('ВсегО ХорошегО!\n');
    process.exit();
})
