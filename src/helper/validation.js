function isValidationUserId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) throw new Error('id не число');
    if (id <= 0) throw new Error('id отрицательное число');

    next();

}

function isValidationUserBody(req, res, next) {
    const { name, surname, birth, city, age } = req.body;
    if (!name) throw new Error('name отсутствует');
    if (!surname) throw new Error('surname отсутствует');
    if (!birth) throw new Error('birth отсутствует');
    if (!city) throw new Error('city отсутствует');
    if (age <= 0) throw new Error('age отрицательное');

    next();
}
module.exports = { isValidationUserId, isValidationUserBody}