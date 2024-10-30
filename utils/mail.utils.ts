export type Mail = `${string}@${string}.${string}`;

export function isEmail(email: string): email is Mail {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}