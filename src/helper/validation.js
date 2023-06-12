function isValidationUserId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) throw new Error('id is not a number');
    if (id <= 0) throw new Error('id is a negative number');

    next();

}

function isValidationUserBody(req, res, next) {
    const { name, surname, birth, city, age } = req.body;
    if (!name) throw new Error('name is missing');
    if (!surname) throw new Error('surname is missing');
    if (!birth) throw new Error('birth is missing');
    if (!city) throw new Error('city is missing');
    if (age <= 0) throw new Error('age is missing');

    next();
}
module.exports = { isValidationUserId, isValidationUserBody}