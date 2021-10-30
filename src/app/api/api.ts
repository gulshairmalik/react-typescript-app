import axios from "./AxiosInstance"
import { GetPhoneNumberResponse, PhoneNumberRequestBody, MessageResponse } from "../models"

export const getPhoneNumbers = async () => {
    try {
        const response = await axios.get("/phone-numbers")
        return response.data as GetPhoneNumberResponse[]
    } catch (error: any) {
        return
    }
}

export const getPhoneNumberById = async (phoneId: string) => {
    try {
        const response = await axios.get(`/phone-number/${phoneId}`)
        return response.data as GetPhoneNumberResponse
    } catch (error: any) {
        return
    }
}

export const addPhoneNumber = async (phoneNumber: PhoneNumberRequestBody) => {
    try {
        const response = await axios.post("/phone-number", JSON.stringify(phoneNumber))
        return { status: response.status, message: response.data.message } as MessageResponse
    } catch (error: any) {
        const errResponse = error.response
        return { status: errResponse.status, message: errResponse.data.message } as MessageResponse 
    }
}

export const updatePhoneNumber = async (phoneId: string, phoneNumber: PhoneNumberRequestBody) => {
    try {
        const response = await axios.put(`/phone-number/${phoneId}`, phoneNumber)
        return { status: response.status, message: response.data.message } as MessageResponse
    } catch (error: any) {
        const errResponse = error.response
        return { status: errResponse.status, message: errResponse.data.message } as MessageResponse 
    }
}

export const deletePhoneNumber = async (phoneId: string, phoneNumber: PhoneNumberRequestBody) => {
    try {
        const response = await axios.delete(`/phone-number/${phoneId}`, { data: phoneNumber })
        return { status: response.status, message: response.data.message } as MessageResponse
    } catch (error: any) {
        const errResponse = error.response
        return { status: errResponse.status, message: errResponse.data.message } as MessageResponse 
    }
}