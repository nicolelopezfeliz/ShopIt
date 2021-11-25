
export function isValidEmail(email: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function isValidPassword(email: string) {
    return email?.length >= 6
}
