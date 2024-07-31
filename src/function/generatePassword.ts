export function GeneratePassword(passwordLength = 8, includeChars: [boolean, boolean, boolean, boolean]) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';

    function getRandomCharacter(chars: string) {
        return chars[Math.floor(Math.random() * chars.length)];
    }

    let password = '';
    let characters = '';

    const charSets = {
        lowercase: includeChars[3] ? lowercase : '',
        uppercase: includeChars[0] ? uppercase : '',
        numbers: includeChars[2] ? numbers : '',
        specialChars: includeChars[1] ? specialChars : ''
    };

    if (includeChars[0]) {
        password += getRandomCharacter(uppercase);
    }
    if (includeChars[1]) {
        password += getRandomCharacter(specialChars);
    }
    if (includeChars[2]) {
        password += getRandomCharacter(numbers);
    }
    if (includeChars[3]) {
        password += getRandomCharacter(lowercase);
    }

    characters = charSets.lowercase + charSets.uppercase + charSets.numbers + charSets.specialChars;

    for (let i = password.length; i < passwordLength; i++) {
        password += getRandomCharacter(characters);
    }

    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}
