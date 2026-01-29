import axios from 'axios'
import { ContactFormData, ApiResponse, ContactMessage } from '../types'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function sendContactMessage(data: ContactFormData): Promise<ApiResponse<ContactMessage>> {
  const response = await api.post<ApiResponse<ContactMessage>>('/contact', data)
  return response.data
}

export async function getHealth(): Promise<{ status: string }> {
  const response = await api.get('/health')
  return response.data
}
