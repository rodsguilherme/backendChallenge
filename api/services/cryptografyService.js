import bcrypt from 'bcryptjs';

const saltKey = '!VWi@g:a:b"<^|a';

const createHash = (text) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(`${text}${saltKey}`, salt);
}

const compareHash = (textToCripto, textToCompare) => {
    return bcrypt.compareSync(`${textToCripto}${saltKey}`, textToCompare);
};

module.exports = { createHash, compareHash };