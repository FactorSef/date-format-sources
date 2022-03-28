/**
 * Возвращает новую строку с первой заглавной буквой
 * @param {String} str Исходная строка
 */
function capitalize(str) {
    return str
        .charAt(0) // берем первый символ строки
        .toUpperCase() // Делаем его заглавнывным
        .concat(str.slice(1)); // Объединяем с исходной строкой без первого символа
}

/**
 * Метод форматирования строки
 * @param {String} dateToFormat Дата в формате `DD.MM.YYYY`
 * @returns строка в формате `<день недели>, <номер недели> неделя <месяц> <год> года`
 */
function formatDate(dateToFormat) {
    // Деструктуризируем массив подстрок
    const [ day, month, year ] = dateToFormat
        .split('.')
        .map(x => {
            return parseInt(x); // Парсим строку к целому числу
        });

    // Создаем объект даты без часовых поясов
    const date = new Date(Date.UTC(year, month - 1, day));

    /**
     *  Получаем день недели первого дня месяца (используется для смещения)
     * @description
     * 1. Создаем новый объект даты, на основе уже созданного
     * 2. Устанавливаем 1-е число
     * 3. Т.к. метод `Date.setDate()` возвращает TimaStamp -- снова создаем объект даты
     * 4. Вычитаем `1` (единицу) для того чтобы смещение производилось от `0` (т.е. если понедельник мы получили не `1`, а `0`)
     */
    const dayOffset = new Date(new Date(date).setDate(1)).getDay() - 1;

    /**
     * Получаем валидный номер недели
     * @description
     * 1. Добавляем к текущему дню `dayOffset` (смещение)
     * 2. Делим на кол-во дней в неделе (`7`)
     * 3. Округляем в большую сторону
     */
    const weekNumber = Math.ceil((date.getDate() + dayOffset) / 7);

    // Деструктуризируем форматированную строку на заданных основе параметров локализации
    const [ weekday, , monthName ] = date
        // Указываем локаль, задаем параметры вывода дня недели, года, месяца и дня
        .toLocaleDateString('ru', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        // Разбиваем полученный результат по ` `(пробелу)
        .split(' ');

    // Собираем новую строку в формате `<День недели>, <номер недели> неделя <Месяца> <год> года`
    return `${capitalize(weekday)} ${weekNumber} неделя ${capitalize(monthName)} ${year} года`;
}
