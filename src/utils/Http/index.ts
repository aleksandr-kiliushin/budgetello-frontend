import { RequestDataWithPayload, RequestDataWithoutPayload, RequestOptions } from './types'

class Http {
  private static get requestOptions(): RequestOptions {
    return {
      headers: {
        Authorization: localStorage.authToken,
        'Content-Type': 'application/json',
      },
    }
  }

  static createFullUrl(url: string): string {
    const backendUrlStart =
      process.env.MODE === 'production'
        ? 'https://finances-app-backend.herokuapp.com:443'
        : 'http://localhost:3080'
    return backendUrlStart + url
  }

  static async delete<T>({ url }: RequestDataWithoutPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      method: 'DELETE',
    })
    return await response.json()
  }

  static async get<T>({ url }: RequestDataWithoutPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, this.requestOptions)
    return await response.json()
  }

  static async patch<T>({ payload, url }: RequestDataWithPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'PATCH',
    })
    return await response.json()
  }

  static async post<T>({ payload, url }: RequestDataWithPayload): Promise<T> {
    const fullUrl = this.createFullUrl(url)
    const response = await fetch(fullUrl, {
      ...this.requestOptions,
      body: JSON.stringify(payload),
      method: 'POST',
    })
    return await response.json()
  }
}

export default Http
