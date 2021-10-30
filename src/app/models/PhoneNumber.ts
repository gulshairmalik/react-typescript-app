export type GetPhoneNumberResponse = {
    _id: string
    phone: string
    __v: number
}

export type PhoneNumberRequestBody = {
    phone: string
}

export type MessageResponse = {
    status: number
    message: string
}