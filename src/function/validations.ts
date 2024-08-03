export const validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)

export const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(password)

export const validatePhone = (Phone: string) => /^[1-9]\d{9}$/.test(Phone.trim())

export const validateName = (Name: string) => /^(?=.*[a-zA-Z]).{3,}$/.test(Name.trim())

export const validateFullName = (FullName: string) => /^(?=.*[ _]).{6,}$/.test(FullName.trim());

export const validateDescription = (description: string) => /^(?![\W_]+$)(?:\b\w+\b\s?){10,}$/.test(description.trim());
